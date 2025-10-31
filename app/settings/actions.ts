"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function update_user(input_data) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  // const { data, error } = await supabase.auth.updateUser(
  //   {
  //       data: input_data
  //   })

  if (!input_data.email) input_data.email = user.user_metadata.email;
  if (!input_data.name) input_data.name = user.user_metadata.full_name;

  // const { data } = await supabase
  // .from('users')
  // .select("*");
  // console.log(data);
  // console.log(input_data);
  // console.log(user.id);

  // const res = await supabase.auth.updateUser(input_data);
  // const res = await supabase
  // .from('users')
  // .upsert({ id: user.id, ...input_data })
  // .overrideTypes<Array<{ id: string }>, { merge: false }>();

  const { error } = await supabase
  .from('users')
  .update({ full_name: input_data.full_name,
   })
  .eq('id', user.id)

  console.error(error);

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function delete_user() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error } =  await supabase.auth.admin.deleteUser(user.id);
  if (error) {
    return { error: error.message };
  }

  // console.log(user);

  // const { data } = await supabase
  // .from('users')
  // .select();
  // console.log(data);

  const response = await supabase
  .from('users')
  .delete()
  .eq('id', user.id)
  .select();
  await supabase.auth.signOut();

  // console.log(response);
  
  revalidatePath("/", "layout");
  redirect("/login");
}

