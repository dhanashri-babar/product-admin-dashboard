"use client";

import { useRouter } from "next/navigation";
import Protected from "../../../components/Protected";
import ProductForm from "../../../components/ProductForm";
import { addProduct } from "../../../lib/productApi";
import { saveAdded } from "../../../lib/localProducts";
import { useState } from "react";

export default function NewProduct() { return <Protected><Create/></Protected>; }
function Create() {
  const router=useRouter(), [busy,setBusy]=useState(false);
  async function submit(product) {
    if(busy) return; setBusy(true);
    try {
      const result=await addProduct(product);
      saveAdded({...product,...result});
      router.replace("/products");
    } finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-2xl p-6"><h1 className="mb-4 text-2xl font-bold">Add Product</h1><ProductForm onSubmit={submit} busy={busy}/></main>;
}