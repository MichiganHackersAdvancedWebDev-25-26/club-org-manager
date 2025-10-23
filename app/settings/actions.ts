"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function update_user(input_data) {
  const supabase = await createClient();
  console.log(input_data.email);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  // const { data, error } = await supabase.auth.updateUser(
  //   {
  //       data: input_data
  //   })

  const { data } = await supabase
  .from('users')
  .select();
  console.log(data);

  const res = await supabase
  .from('users')
  .upsert({ id: user?.id, ...input_data })
  .select()
  .overrideTypes<Array<{ id: string }>, { merge: false }>();

  // console.log(user?.user_metadata);

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function delete_user() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  await supabase.auth.admin.deleteUser(user?.id);

  // console.log(user);

  // const { data } = await supabase
  // .from('users')
  // .select();
  // console.log(data);

  // const response = await supabase
  // .from('users')
  // .delete()
  // .eq('id', user?.id)
  // .select();

  // console.log(response);
  
  revalidatePath("/", "layout");
  redirect("/login");
}

