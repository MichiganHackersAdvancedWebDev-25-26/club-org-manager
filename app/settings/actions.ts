"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function something_else(input_data) {
  const supabase = await createClient();

  const { user, error } = await supabase.auth.updateUser(
    {
        data: {email: input_data.email, full_name: input_data.full_name}
    })



  const { data } = await supabase
  .from('users')
  .update()
  .select()
  .overrideTypes<Array<{ id: string }>, { merge: false }>()

  revalidatePath("/", "layout");
  redirect("/login");
}

