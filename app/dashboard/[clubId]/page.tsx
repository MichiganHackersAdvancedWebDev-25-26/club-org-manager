import { getClub } from "../actions";
import { ClubSettings } from "./components/ClubSettings";

type PageProps = {
  params: Promise<{ clubId: string }>;
};

export default async function ClubDashboardPage({ params }: PageProps) {
  const { clubId } = await params;
  const club = await getClub(clubId);

  if (!club) {
    return <div>Club not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{club.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground">
            {club.description || "No description available"}
          </p>
        </section>
        <section className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h3 className="font-semibold mb-2">Announcements</h3>
          <p className="text-muted-foreground">No announcements yet</p>
        </section>
        <section className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h3 className="font-semibold mb-2">Events</h3>
          <p className="text-muted-foreground">No events scheduled</p>
        </section>
        <section className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h3 className="font-semibold mb-2">Members</h3>
          <p className="text-muted-foreground">Member management coming soon</p>
        </section>
      </div>

      <ClubSettings clubId={clubId} clubName={club.name} />
    </div>
  );
}
