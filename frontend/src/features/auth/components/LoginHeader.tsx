export function LoginHeader() {
  return (
    <header className="mb-8 text-center">
      {/* Logo */}
      <div className="mb-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white shadow-md">
          D
        </div>
      </div>

      {/* Brand */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        DineIQ
      </h1>

      {/* Heading */}
      <h2 className="mt-4 text-2xl font-semibold text-slate-800">
        Welcome Back
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Sign in to access your restaurant dashboard.
      </p>
    </header>
  );
}