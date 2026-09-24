"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Protected from "../../../../components/Protected";
import ProductForm from "../../../../components/ProductForm";
import Loading from "../../../../components/Loading";
import { getProduct, updateProduct } from "../../../../lib/productApi";
import { applyLocalChanges, saveUpdated } from "../../../../lib/localProducts";

export default function EditProduct() { return <Protected><Edit/></Protected>; }
function Edit() {
  const {id}=useParams(), router=useRouter();
  const [product,setProduct]=useState(null),[busy,setBusy]=useState(false),[missing,setMissing]=useState(false);
  useEffect(()=>{getProduct(id).then(p=>setProduct(applyLocalChanges([p])[0])).catch(()=>setMissing(true));},[id]);
  async function submit(next) {
    if(busy) return; setBusy(true);
    try { const result=await updateProduct(id,next); saveUpdated(id,{...next,...result}); router.replace(`/products/${id}`); }
    finally { setBusy(false); }
  }
  if(missing) return <main className="p-6">Product not found.</main>;
  if(!product) return <Loading/>;
  return <main className="mx-auto max-w-2xl p-6"><h1 className="mb-4 text-2xl font-bold">Edit Product</h1><ProductForm initial={product} onSubmit={submit} busy={busy}/></main>;
}