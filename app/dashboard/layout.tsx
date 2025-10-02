import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Users } from "lucide-react";
import { signout } from "./actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr] grid-cols-1 bg-background">
      <aside className="hidden md:block border-r border-border bg-card p-4 space-y-4">
        <div className="text-lg font-semibold text-foreground">
          Club Manager
        </div>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Users className="h-4 w-4" />
            Your Clubs
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
        <div className="pt-4 border-t border-border">
          <form action={signout}>
            <Button
              type="submit"
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </aside>
      <main className="p-6 bg-background">{children}</main>
    </div>
  );
}
