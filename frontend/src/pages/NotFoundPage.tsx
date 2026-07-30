import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="text-lg text-gray-500">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="rounded-md bg-black px-5 py-2 text-white transition hover:opacity-90"
      >
        Go to Login
      </Link>
    </main>
  );
}