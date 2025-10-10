import { Feature } from "@/components/feature";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="min-h-screen py-32 space-y-8 px-4">
      <Feature className="mx-auto" />
      <Button asChild className="mx-auto block w-min">
        <Link href="/">Back</Link>
      </Button>
    </main>
  );
}
