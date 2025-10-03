import Link from "next/link";
import { something_else } from "./actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
// import { useState } from 'react';

// const supabase = await createClient();
// const { data: { user } } = await supabase.auth.getUser();

function handleSubmit(e){
    e.preventDefault()
    const data = {
        full_name: e.target.full_name.value,
        email: e.target.email.value
    }
    something_else(data)
}

export default async function SettingsPage() {
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  // const [ user_data, set_user_data ] = useState(user.user_metadata);


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="grid gap-4">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          Profile
          <form onSubmit={handleSubmit}>
            <input type="text" id="fn" name="full_name" placeholder={user.user_metadata.full_name}/>
            <input type="text" id="em" name="email" placeholder={user.user_metadata.email}/>
            <Button type="submit" variant="outline">
              Thingy
            </Button>
          </form>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          Accounts
        </div>
      </div>
    </div>
  );
}
