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
    return { error: error.message };
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

export async function createClub(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting user:", userError);
    return { error: "User not authenticated" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name || name.length < 3) {
    return { error: "Club name must be at least 3 characters long" };
  }

  if (!description || description.length < 25) {
    return { error: "Description must be at least 25 characters long" };
  }

  try {
    const { data: club, error: clubError } = await supabase
      .from("clubs")
      .insert({
        name: name.trim(),
        description: description?.trim() || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (clubError) {
      console.error("Error creating club:", clubError);
      return { error: "Failed to create club. Name may already exist." };
    }
    const { error: membershipError } = await supabase
      .from("memberships")
      .insert({
        user_id: user.id,
        club_id: club.id,
        role: "admin",
      });

    if (membershipError) {
      console.error("Error creating membership:", membershipError);
      await supabase.from("clubs").delete().eq("id", club.id);
      return { error: "Failed to create club membership" };
    }

    revalidatePath("/dashboard");
    return { success: true, clubId: club.id };
  } catch (error) {
    console.error("Error creating club:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteClub(clubId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting user:", userError);
    return { error: "User not authenticated" };
  }

  try {
    const { data: membership, error: membershipError } = await supabase
      .from("memberships")
      .select("role")
      .eq("user_id", user.id)
      .eq("club_id", clubId)
      .single();

    if (membershipError || !membership) {
      return { error: "Club not found or you don't have permission" };
    }

    if (membership.role !== "admin") {
      return { error: "Only club admins can delete the club" };
    }

    const { error: membershipsDeleteError } = await supabase
      .from("memberships")
      .delete()
      .eq("club_id", clubId);

    if (membershipsDeleteError) {
      console.error("Error deleting memberships:", membershipsDeleteError);
      return { error: "Failed to delete club memberships" };
    }

    const { error: deleteError } = await supabase
      .from("clubs")
      .delete()
      .eq("id", clubId);

    if (deleteError) {
      console.error("Error deleting club:", deleteError);
      return { error: "Failed to delete club" };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting club:", error);
    return { error: "An unexpected error occurred" };
  }
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
