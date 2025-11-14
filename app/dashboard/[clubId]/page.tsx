"use client";

import { getClub, getEvents, getClubUsers } from "../actions";
import { ClubSettings } from "./components/ClubSettings";
import { JSX, useEffect, useState } from "react";
import MemberSection from "./components/MemberSection";
import EventSection from "./components/EventSection";
import AnnouncementSection from "./components/AnnouncementSection";
import DescriptionSection from "./components/DescriptionSection";
import { Club, ClubUser, Event, Announcement, UserClub } from "@/lib/types";
import { useParams } from "next/navigation";

type Section = {
  header: string;
  content: JSX.Element;
};

const ClubDashboardPage = () => {
  const { clubId } = useParams<{ clubId: string }>();

  const [club, setClub] = useState<Club | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<ClubUser[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchClubByClubId = async (clubId: string) => {
    try {
      const data = await getClub(clubId);
      if (data) {
        setClub(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEventsByClubId = async (clubId: string) => {
    const data = await getEvents(clubId);
    setEvents(data);
  };

  const fetchMembersByClubId = async (clubId: string) => {
    const data = await getClubUsers(clubId);
    setMembers(data);
  };

  useEffect(() => {
    const getClub = async () => {
      await fetchClubByClubId(clubId);
    };
    getClub();
  }, []);
  useEffect(() => {
    fetchEventsByClubId(clubId);
  }, [club]);
  useEffect(() => {
    fetchMembersByClubId(clubId);
  }, [club]);

  console.log(members);

  const sections: Section[] = [
    {
      header: "Overview",
      content: <DescriptionSection description={club?.description} />,
    },
    {
      header: "Announcements",
      content: <AnnouncementSection announcements={announcements} />,
    },
    { header: "Events", content: <EventSection events={events} /> },
    { header: "Members", content: <MemberSection members={members} /> },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (!club) return <div>Club not found</div>;

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
};

export default ClubDashboardPage;
