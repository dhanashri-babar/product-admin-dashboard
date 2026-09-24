"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Protected from "../../../components/Protected";
import Loading from "../../../components/Loading";
import { getProduct } from "../../../lib/productApi";
import { applyLocalChanges } from "../../../lib/localProducts";

export default function ProductDetails() {
  return <Protected><Details /></Protected>;
}
function Details() {
  const { id } = useParams(), router = useRouter();
  const [p,setP] = useState(null), [state,setState] = useState("loading");
  useEffect(() => {
    const c = new AbortController();
    getProduct(id,c.signal).then(x=>setP(applyLocalChanges([x])[0])).catch(e=>{
      if(e.code !== "ERR_CANCELED") setState("notfound");
    }).finally(()=>setState(s=>s==="notfound"?"notfound":"ready"));
    return ()=>c.abort();
  },[id]);
  if(state==="loading") return <Loading/>;
  if(!p) return <main className="p-6"><h1 className="text-2xl font-bold">Product not found</h1><Link href="/products" className="text-blue-600">Back</Link></main>;
  return <main className="mx-auto max-w-4xl p-6">
    <Link href="/products" className="text-blue-600">← Back</Link>
    <div className="mt-4 rounded-xl border bg-white p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div><img src={p.images?.[0] || p.thumbnail} alt={p.title} className="w-full rounded-xl object-cover"/></div>
        <div><h1 className="text-3xl font-bold">{p.title}</h1><p className="mt-2 text-slate-500">{p.category}</p><p className="mt-4 text-2xl font-semibold">${p.price}</p><p className="mt-4">{p.description}</p><p className="mt-3">Rating: {p.rating} · Stock: {p.stock}</p><Link href={`/products/${p.id}/edit`} className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white">Edit</Link></div>
      </div>
      <h2 className="mt-8 text-xl font-bold">Reviews</h2>
      <div className="mt-3 grid gap-3">{(p.reviews || []).map((r,i)=><div key={i} className="rounded-lg bg-slate-50 p-3"><b>{r.reviewerName}</b> · ⭐ {r.rating}<p>{r.comment}</p></div>)}</div>
    </div>
  </main>;
}