import Link from "next/link";

export default function ProductTable({ products, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="hidden w-full md:table">
        <thead className="bg-slate-50 text-left text-sm text-slate-600">
          <tr>
            <th className="p-3">Image</th><th className="p-3">Title</th>
            <th className="p-3">Category</th><th className="p-3">Price</th>
            <th className="p-3">Rating</th><th className="p-3">Stock</th><th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-3"><img src={p.thumbnail} alt="" className="h-12 w-12 rounded object-cover" /></td>
              <td className="p-3 font-medium"><Link className="hover:underline" href={`/products/${p.id}`}>{p.title}</Link></td>
              <td className="p-3">{p.category}</td><td className="p-3">${p.price}</td>
              <td className="p-3">{p.rating}</td><td className="p-3">{p.stock}</td>
              <td className="p-3 whitespace-nowrap">
                <Link href={`/products/${p.id}/edit`} className="mr-3 text-blue-600">Edit</Link>
                <button onClick={() => onDelete(p)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-3 p-3 md:hidden">
        {products.map(p => (
          <div key={p.id} className="rounded-lg border p-4">
            <div className="flex gap-3">
              <img src={p.thumbnail} alt="" className="h-20 w-20 rounded object-cover" />
              <div className="min-w-0">
                <Link href={`/products/${p.id}`} className="font-semibold hover:underline">{p.title}</Link>
                <p className="text-sm text-slate-500">{p.category}</p>
                <p className="mt-1">${p.price} · ⭐ {p.rating} · Stock {p.stock}</p>
              </div>
            </div>
            <div className="mt-3">
              <Link href={`/products/${p.id}/edit`} className="mr-4 text-blue-600">Edit</Link>
              <button onClick={() => onDelete(p)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}