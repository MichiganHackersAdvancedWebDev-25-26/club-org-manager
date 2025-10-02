export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold">Club Org Manager</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage clubs, events, and members.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium"
          >
            Login / Signup
          </a>

          <a
            href="/faq"
            className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium"
            >
            FAQ
          </a>

          <a
            href="/features"
            className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium"
            >
            Features
          </a>

        </div>
      </div>
    </main>
  );
}
