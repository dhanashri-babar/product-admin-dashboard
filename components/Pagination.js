export default function Pagination({ page, total, limit, onPage, onLimit }) {
  const pages = Math.max(1, Math.ceil(total / limit));
  const first = total === 0 ? 0 : (page - 1) * limit + 1;
  const last = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-3 border-t p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <span>Showing {first}–{last} of {total}</span>
      <div className="flex flex-wrap items-center gap-2">
        <select value={limit} onChange={e => onLimit(Number(e.target.value))} className="rounded border px-2 py-1">
          {[10,20,50].map(n => <option key={n} value={n}>{n} / page</option>)}
        </select>
        <button disabled={page === 1} onClick={() => onPage(page - 1)} className="rounded border px-3 py-1 disabled:opacity-40">Previous</button>
        {Array.from({length: Math.min(pages, 7)}, (_, i) => {
          const p = i + 1;
          return <button key={p} onClick={() => onPage(p)} className={`rounded border px-3 py-1 ${p===page ? "bg-slate-900 text-white" : ""}`}>{p}</button>;
        })}
        <button disabled={page === pages} onClick={() => onPage(page + 1)} className="rounded border px-3 py-1 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}