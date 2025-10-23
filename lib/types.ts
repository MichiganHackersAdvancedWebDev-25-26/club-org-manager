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

export type { Club, UserClub };
