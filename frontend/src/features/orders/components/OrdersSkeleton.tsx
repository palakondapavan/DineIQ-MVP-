export default function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-3xl bg-white p-6 shadow"
        >
          <div className="mb-6 h-6 w-48 rounded bg-slate-200" />

          <div className="space-y-3">
            <div className="h-20 rounded-2xl bg-slate-200" />
            <div className="h-20 rounded-2xl bg-slate-200" />
          </div>

          <div className="mt-6 h-6 w-28 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}