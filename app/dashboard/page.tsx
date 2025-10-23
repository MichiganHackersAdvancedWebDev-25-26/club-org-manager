import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserClubs } from "./actions";
import { UserClub } from "@/lib/types";
import { CreateClubModal } from "./components/CreateClubModal";

export default async function DashboardPage() {
  try {
    const clubs = await getUserClubs();

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Your Clubs</h1>
          <CreateClubModal />
        </div>

        {clubs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">No clubs yet</h3>
                <p className="text-muted-foreground">
                  You haven't joined or created any clubs yet.
                </p>
                <CreateClubModal />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club: UserClub) => (
              <Card key={club.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      <Link
                        href={`/dashboard/${club.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {club.name}
                      </Link>
                    </CardTitle>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        club.role === "admin"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : club.role === "officer"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {club.role}
                    </span>
                  </div>
                  <CardDescription>{club.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      Created: {new Date(club.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Joined: {new Date(club.joined_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Your Clubs</h1>
          <CreateClubModal />
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-destructive">
                Error Loading Clubs
              </h3>
              <p className="text-muted-foreground">
                There was an error loading your clubs. Please try refreshing the
                page.
              </p>
              <div className="flex gap-2 mt-4">
                <Button asChild>
                  <Link href="/dashboard">Refresh</Link>
                </Button>
                <CreateClubModal />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
