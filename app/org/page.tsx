"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Club } from "@/lib/types";
import OrgCard from "./components/OrgCard";
import { createClient } from "@/utils/supabase/client";

const SupaClient = createClient();

const OrganizationPage = () => {
  const [orgs, setOrgs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await SupaClient.from("clubs")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Error fetching clubs:", error);
        } else {
          setOrgs(data || []);
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">All Clubs</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Clubs</h1>
          <p className="text-muted-foreground">
            Discover and join clubs in your community
          </p>
        </div>

        {orgs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No clubs found</h3>
            <p className="text-muted-foreground">
              There are no clubs available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orgs.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationPage;
