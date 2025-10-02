import Link from "next/link";
import { signout } from "./actions";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Clubs</h1>
        <form action={signout}>
          <Button type="submit" variant="outline">
            Sign Out
          </Button>
        </form>
      </div>
      <ul className="list-disc pl-6">
        <li>
          <Link href="/dashboard/club-123" className="underline">
            Club 123
          </Link>
        </li>
      </ul>
    </div>
  );
}
