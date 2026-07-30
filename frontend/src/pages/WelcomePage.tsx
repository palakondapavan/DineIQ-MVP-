export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome to DineIQ 🎉
        </h1>

        <p className="mt-3 text-slate-600">
          Authentication successful.
        </p>
      </div>
    </div>
  );
}