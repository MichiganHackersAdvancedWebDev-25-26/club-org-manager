import { Faq } from "@/components/FAQ";
import { Feature } from "@/components/feature";

export default function Home() {
  return (
    <main className="min-h-screen p-8 space-y-24">
      <section className="flex w-full justify-center">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <h1 className="text-6xl font-semibold">
            Discover your{" "}
            <span className="bg-gradient-to-bl from-blue-600 to-indigo-900 bg-clip-text text-transparent">
              community
            </span>{" "}
            on campus
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Connect with like-minded students, explore new interests, and build
            lasting friendships through our vibrant club ecosystem.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-indigo-900 dark:bg-white dark:text-black"
            >
              Join now
            </a>

            <a
              href="/faq"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-indigo-900 dark:bg-white dark:text-black"
            >
              FAQ
            </a>

            <a
              href="/features"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-indigo-900 dark:bg-white dark:text-black"
            >
              Features
            </a>
          </div>
        </div>
      </section>
      <Feature className="max-w-2xl mx-auto" />
      <Faq className="mx-auto max-w-2xl" />
      <section className="grid grid-cols-1 self-stretch md:grid-cols-2 lg:grid-cols-3"></section>
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto text-center">
          <div className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
            150+
          </div>
          <div className="text-muted-foreground">Active Clubs</div>
        </div>
      </section>
    </main>
  );
}
