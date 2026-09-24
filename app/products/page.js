"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Protected from "../../components/Protected";
import LogoutButton from "../../components/LogoutButton";
import Loading from "../../components/Loading";
import ErrorState from "../../components/ErrorState";
import ProductTable from "../../components/ProductTable";
import Pagination from "../../components/Pagination";
import { getCategories, getProducts, searchProducts, deleteProduct } from "../../lib/productApi";
import { applyLocalChanges, saveDeleted } from "../../lib/localProducts";

export default function ProductsPage() {
  return <Protected><Dashboard /></Protected>;
}

function Dashboard() {
  const router = useRouter(), pathname = usePathname(), params = useSearchParams();
  const rawPage = Number(params.get("page")), rawLimit = Number(params.get("limit"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = [10,20,50].includes(rawLimit) ? rawLimit : 10;
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "";
  const [input, setInput] = useState(search);
  const [data, setData] = useState({ products: [], total: 0 });
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const updateUrl = useCallback((changes) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([k,v]) => {
      if (v === "" || v == null) next.delete(k); else next.set(k, String(v));
    });
    router.push(`${pathname}?${next.toString()}`);
  }, [params, pathname, router]);

  useEffect(() => {
    setInput(search);
    const timer = setTimeout(() => {
      if (input !== search) updateUrl({ search: input, page: 1 });
    }, 450);
    return () => clearTimeout(timer);
  }, [input]); // debounce search input

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;
    setStatus("loading"); setError("");

    (async () => {
      try {
        const queryParams = { limit, skip: (page-1)*limit };
        let result;
        if (search) {
          result = await searchProducts(search, queryParams, controller.signal);
        } else {
          result = await getProducts(queryParams, controller.signal);
        }
        result.products = applyLocalChanges(result.products);
        setData(result);
        setStatus("ready");
      } catch (e) {
        if (e.code === "ERR_CANCELED" || e.name === "CanceledError") return;
        setError("Could not load products.");
        setStatus("error");
      }
    })();
    return () => controller.abort();
  }, [page, limit, search]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const visible = useMemo(() => {
    let list = [...data.products];
    if (category) list = list.filter(p => p.category === category);
    if (sort === "price-asc") list.sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") list.sort((a,b)=>b.price-a.price);
    if (sort === "rating") list.sort((a,b)=>b.rating-a.rating);
    if (sort === "title") list.sort((a,b)=>a.title.localeCompare(b.title));
    return list;
  }, [data.products, category, sort]);

  async function remove(p) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    try { await deleteProduct(p.id); } catch {}
    saveDeleted(p.id);
    setData(d => ({...d, products: d.products.filter(x=>x.id !== p.id), total: Math.max(0,d.total-1)}));
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl p-4 sm:p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold">Product Admin Dashboard</h1><p className="text-sm text-slate-500">Manage products</p></div>
        <div className="flex gap-2"><button onClick={()=>router.push("/products/new")} className="rounded-lg bg-blue-600 px-4 py-2 text-white">Add Product</button><LogoutButton /></div>
      </header>

      <section className="mb-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-4">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Search products..." className="rounded-lg border px-3 py-2 md:col-span-2" />
        <select value={category} onChange={e=>updateUrl({category:e.target.value,page:1})} className="rounded-lg border px-3 py-2">
          <option value="">All categories</option>{categories.map(c => <option key={typeof c==="string"?c:c.slug} value={typeof c==="string"?c:c.slug}>{typeof c==="string"?c:c.name}</option>)}
        </select>
        <select value={sort} onChange={e=>updateUrl({sort:e.target.value,page:1})} className="rounded-lg border px-3 py-2">
          <option value="">Sort: default</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="rating">Rating</option><option value="title">Title</option>
        </select>
      </section>

      {status === "loading" && <Loading text="Loading products..." />}
      {status === "error" && <ErrorState message={error} onRetry={()=>router.refresh()} />}
      {status === "ready" && visible.length === 0 && <div className="rounded-xl border bg-white p-10 text-center text-slate-500">No products found.</div>}
      {status === "ready" && visible.length > 0 && <><ProductTable products={visible} onDelete={remove}/><Pagination page={page} total={data.total} limit={limit} onPage={p=>updateUrl({page:p})} onLimit={l=>updateUrl({limit:l,page:1})}/></>}
    </main>
  );
}