"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Club } from "@/lib/types";
import OrgCard from "./components/OrgCard";

import { createClient } from "@/utils/supabase/client";
const SupaClient = createClient();

const OrganizationPage = () => {
  const [orgs, setOrgs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await SupaClient.from("clubs").select("*");
      if (error) {
        console.error("Error fetching clubs:", error);
      } else {
        setOrgs(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Clubs</h1>
      <ul>
        {orgs.map((org) => (
          <li key={org.id}>
            <OrgCard org={org} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationPage;
