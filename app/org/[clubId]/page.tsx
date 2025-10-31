"use client";

import { useEffect, useState} from "react";
import { useParams } from 'next/navigation'
import { Club } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

const SupaClient = createClient();

export default function ClubPage() {
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ clubId: string}>()
  console.log("Club ID:", params.clubId);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const { data, error } = await SupaClient.from("clubs")
          .select("*")
          .eq("id", params.clubId)
          .single();
        
        if (error) {
          console.error("Error fetching club:", error);
        } else {
          setClub(data);
        }
      } catch (error) {
        console.error("Error fetching club:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClub();
  }, [params.clubId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!club) {
    return <div>Club not found</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{club.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Created {new Date(club.created_at).toLocaleDateString()}</p>
        </header>

        <section className="mb-6">
          <h2 className="text-lg font-medium mb-2">About</h2>
          <p className="text-muted-foreground">{club.description}</p>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-2">Contact Information</h2>
          <div className="text-muted-foreground">Email: </div>
          <div className="text-muted-foreground">Website: </div>
        </section>
      </div>
    </div>
  );
}