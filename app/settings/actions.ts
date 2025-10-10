"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function something_else(input_data) {
  const supabase = await createClient();
  console.log(input_data.email);
  console.log("Im here");
  const { data: {user} } = await supabase.auth.getUser();
  // const { data, error } = await supabase.auth.updateUser(
  //   {
  //       data: input_data
  //   })



  const { data } = await supabase
  .from('users')
  .upsert({ id: user?.id, data: input_data})
  .select()
  .overrideTypes<Array<{ id: string }>, { merge: false }>()

  // console.log(user?.user_metadata);

  revalidatePath("/", "layout");
  redirect("/login");
}

