export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
      <p className="mb-3 text-red-700">{message}</p>
      <button onClick={onRetry} className="rounded-lg bg-red-600 px-4 py-2 text-white">
        Retry
      </button>
    </div>
  );
}