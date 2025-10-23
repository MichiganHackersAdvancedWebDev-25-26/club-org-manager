"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Club, UserClub } from "@/lib/types";

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error.message);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getUserClubs(): Promise<UserClub[]> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting user:", userError);
    return [];
  }

  const { data: memberships, error: membershipsError } = await supabase
    .from("memberships")
    .select(
      `
      role,
      joined_at,
      clubs!inner (
        id,
        name,
        description,
        created_by,
        created_at
      )
    `
    )
    .eq("user_id", user.id)
    .order("joined_at", { ascending: false });

  if (membershipsError) {
    console.error("Error fetching memberships:", membershipsError);
    return [];
  }

  const userClubs: UserClub[] =
    memberships?.map((membership: any) => ({
      id: membership.clubs.id,
      name: membership.clubs.name,
      description: membership.clubs.description,
      created_by: membership.clubs.created_by,
      created_at: membership.clubs.created_at,
      role: membership.role as "member" | "officer" | "admin",
      joined_at: membership.joined_at,
    })) || [];

  return userClubs;
}

export async function getClub(id: string): Promise<Club | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching club:", error);
    return null;
  }

  return data as Club;
}
