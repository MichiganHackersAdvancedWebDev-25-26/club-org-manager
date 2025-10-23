"use client";
import { update_user, delete_user } from "./actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from 'react'
// import { useState } from 'react';

// const supabase = await createClient();
// const { data: { user } } = await supabase.auth.getUser();


export default function SettingsPage() {
  const [fullname, setFullname] = useState(null)
  const [email, setEmail] = useState(null)

  function handleUpdate(e: SubmitEvent){
      e.preventDefault();
      const data = {
          full_name: fullname,
          email: email
      }
      update_user(data);
  }

  function handleDelete(e: SubmitEvent){
      e.preventDefault();
      delete_user();
  }
  
  
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // const [ user_data, set_user_data ] = useState(user.user_metadata);


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="grid gap-4">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <b>Profile</b>
          {/* <form onSubmit={handleSubmit}>
            <input type="text" id="fn" name="full_name" placeholder={user.user_metadata.full_name}/>
            <input type="text" id="em" name="email" placeholder={user.user_metadata.email}/>
            <Button type="submit" variant="outline">
              Thingy
            </Button>
          </form> */}
          <form onSubmit={handleUpdate} className="form-widget">
            <div>
              <label htmlFor="email">Email: </label>
              <input 
                id="email" 
                type="text"
                disabled 
                className="border-solid border-black border-2 border rounded-md" 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="full_name">Name: </label>
              <input
                id="full_name"
                type="text"
                className="border-solid border-black border-2 border rounded-md"
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </form>
          <form onSubmit={handleDelete} className="form-widget">
            <Button type="submit" variant="outline">
              Delete User
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
