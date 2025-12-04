"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

interface UpdateUserData {
  full_name: string;
}

export async function updateUser(data: UpdateUserData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("users")
    .update({ full_name: data.full_name })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update profile" };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function deleteUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error: membershipError } = await supabase
    .from("memberships")
    .delete()
    .eq("user_id", user.id);

  if (membershipError) {
    console.error("Error deleting memberships:", membershipError);
  }

  const { error: userTableError } = await supabase
    .from("users")
    .delete()
    .eq("id", user.id);

  if (userTableError) {
    console.error("Error deleting user record:", userTableError);
    return { error: "Failed to delete account" };
  }

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
