"use client";
import { update_user, delete_user } from "./actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from 'react'
import { is } from "zod/v4/locales";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useState } from 'react';

// const supabase = await createClient();
// const { data: { user } } = await supabase.auth.getUser();


export default function SettingsPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const is_disabled = {'full_name': false, 'email': true};
  const [errors, setErrors] = useState({});
  
  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;
    const fullName = firstName + " " + lastName;
    //Name
    if(!is_disabled['full_name']) {
      if(!fullName){
        formIsValid = false;
        formErrors["first_name"] = "Cannot be empty";
        formErrors["last_name"] = "Cannot be empty";
      }

      if(typeof fullName !== "undefined"){
        if(!firstName.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          formErrors["first_name"] = "Only letters";
        } else if(!lastName.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          formErrors["last_name"] = "Only letters";
        }      
      }
    }
    

    //Email
    if(!is_disabled['email']) {
      if(!email){
        formIsValid = false;
        formErrors["email"] = "Cannot be empty";
      }

      if(typeof email !== "undefined"){
        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          formErrors["email"] = "Email is not valid";
        }
      } 
    }  
    setErrors(formErrors)
    return formIsValid;
  }

  function handleUpdate(e: SubmitEvent){
      e.preventDefault();
      if(handleValidation()){
        // alert("Form submitted");
      }else{
        alert("Form has errors");
      }
      const fullName = firstName + " " + lastName;
      const data = {
          full_name: fullName,
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
            {/* <div>
              <label htmlFor="full_name">Name: </label>
              <input
                id="full_name"
                type="text"
                className="border-solid border-black border-2 border rounded-md"
                // required
                placeholder={is_disabled['full_name']?'Disabled': fullName}
                onChange={(e) => setFullname(e.target.value)}
              />
              <span className="error">{errors["name"]}</span>
            </div> */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={is_disabled['email']?'Disabled': email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-input text-foreground"
                />
                <span className="error">{errors["email"]}</span>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={is_disabled['full_name']?'Disabled': firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-background border-input text-foreground"
                />
              </div>
              <span className="error">{errors["first_name"]}</span>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder={is_disabled['full_name']?'Disabled': lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-background border-input text-foreground"
                />
              </div>
              <span className="error">{errors["last_name"]}</span>
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
