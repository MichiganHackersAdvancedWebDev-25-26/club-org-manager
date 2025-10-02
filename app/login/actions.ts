"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`.trim(),
      },
    },
  };

  const { error, data: authData } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  if (authData.user && !authData.session) {
    return {
      success: true,
      message:
        "Please check your email and click the confirmation link to complete your registration.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
