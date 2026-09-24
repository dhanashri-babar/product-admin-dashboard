use client";

import { useState } from "react";

export default function ProductForm({ initial = {}, onSubmit, busy = false }) {
  const [form, setForm] = useState({
    title: initial.title || "", price: initial.price ?? "", category: initial.category || "",
    stock: initial.stock ?? "", description: initial.description || "",
    thumbnail: initial.thumbnail || ""
  });
  const [errors, setErrors] = useState({});

  function change(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (form.price === "" || Number(form.price) < 0) next.price = "Enter a valid price";
    if (!form.category.trim()) next.category = "Category is required";
    if (form.stock === "" || Number(form.stock) < 0) next.stock = "Enter valid stock";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ ...form, price: Number(form.price), stock: Number(form.stock) });
  }

  const field = (name, label, type="text") => (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input name={name} type={type} value={form[name]} onChange={change} className="rounded-lg border px-3 py-2" />
      {errors[name] && <span className="text-sm text-red-600">{errors[name]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border bg-white p-5">
      {field("title", "Title")}
      {field("price", "Price", "number")}
      {field("category", "Category")}
      {field("stock", "Stock", "number")}
      {field("thumbnail", "Image URL")}
      <label className="grid gap-1">
        <span className="text-sm font-medium">Description</span>
        <textarea name="description" value={form.description} onChange={change} rows={4} className="rounded-lg border px-3 py-2" />
      </label>
      <button disabled={busy} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50">
        {busy ? "Saving..." : "Save"}
      </button>
    </form>
  );
}