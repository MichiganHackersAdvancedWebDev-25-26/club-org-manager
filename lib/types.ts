interface Club {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

interface UserClub {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  role: "member" | "officer" | "admin";
  joined_at: string;
}

interface ClubUser {
  id: string;
  name: string;
  role: "member" | "officer" | "admin";
  joined_at: string;
}

interface Event {
  id: string;
  club_id: string;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  location: string;
  created_at: Date;
}

interface Announcement {
  id: string;
  club_id: string;
  posted_by: string;
  content: string;
  createdAt: Date;
}

export type { Club, UserClub, ClubUser, Event, Announcement };
