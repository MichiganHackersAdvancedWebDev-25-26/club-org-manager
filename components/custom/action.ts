"use server";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function leaveClub(clubId: string) {
  const supabase = await createClient();
  // 1. Get the currently logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error getting user:", userError);
    return { error: "User not authenticated" };
  }
  try {
    // 2. Check if the user is a member of this club
    const { data: membership, error: membershipError } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", user.id)
      .eq("club_id", clubId)
      .single();
    if (membershipError || !membership) {
      return { error: "You are not a member of this club" };
    }

    // 3. Delete the user's membership (user leaves the club)
    const { error: deleteError } = await supabase
      .from("memberships")
      .delete()
      .eq("user_id", user.id)
      .eq("club_id", clubId);
    if (deleteError) {
      console.error("Error leaving club:", deleteError);
      return { error: "Failed to leave the club" };
    }

    // 4. Revalidate to refresh UI (optional if using Next.js)
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error leaving club:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function joinClub(clubId: string) {
  const supabase = await createClient();
  // 1. Get the currently logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting user:", userError);
    return { error: "User not authenticated" };
  }

  try {
    // 2. Create a new membership for the user in the specified club
    const { error: insertError } = await supabase.from("memberships").insert({
      user_id: user.id,
      club_id: clubId,
      role: "member",
    });

    if (insertError) {
      console.error("Error joining club:", insertError);
      return { error: "Failed to join the club" };
    }

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error joining club:", error);
    return { error: "An unexpected error occurred" };
  }
}
