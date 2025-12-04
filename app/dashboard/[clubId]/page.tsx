import { getClub, getEvents, getClubUsers, getAnnouncements } from "../actions";
import { ClubSettings } from "./components/ClubSettings";
import MemberSection from "./components/MemberSection";
import EventSection from "./components/EventSection";
import AnnouncementSection from "./components/AnnouncementSection";
import DescriptionSection from "./components/DescriptionSection";
import { notFound } from "next/navigation";

type Section = {
  header: string;
  content: React.ReactNode;
};

interface ClubDashboardPageProps {
  params: Promise<{ clubId: string }>;
}

export default async function ClubDashboardPage({
  params,
}: ClubDashboardPageProps) {
  const { clubId } = await params;

  const [club, events, members, announcements] = await Promise.all([
    getClub(clubId),
    getEvents(clubId),
    getClubUsers(clubId),
    getAnnouncements(clubId),
  ]);

  if (!club) {
    notFound();
  }

  const sections: Section[] = [
    {
      header: "Overview",
      content: <DescriptionSection description={club.description} />,
    },
    {
      header: "Announcements",
      content: <AnnouncementSection announcements={announcements} />,
    },
    {
      header: "Events",
      content: <EventSection events={events} />,
    },
    {
      header: "Members",
      content: <MemberSection members={members} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{club.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, idx) => (
          <section
            key={idx}
            className="rounded-lg border border-black/10 dark:border-white/15 p-4"
          >
            <h3 className="font-semibold mb-2">{section.header}</h3>
            {section.content}
          </section>
        ))}
      </div>

      <ClubSettings clubId={clubId} clubName={club.name} />
    </div>
  );
}
