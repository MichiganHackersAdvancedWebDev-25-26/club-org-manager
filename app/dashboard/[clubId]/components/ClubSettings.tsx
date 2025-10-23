"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteClubModal } from "../../components/DeleteClubModal";
import { createClient } from "@/utils/supabase/client";
import { Settings } from "lucide-react";

interface ClubSettingsProps {
  clubId: string;
  clubName: string;
}

export function ClubSettings({ clubId, clubName }: ClubSettingsProps) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: membership } = await supabase
          .from("memberships")
          .select("role")
          .eq("user_id", user.id)
          .eq("club_id", clubId)
          .single();

        setUserRole(membership?.role || null);
      }
      setLoading(false);
    };

    checkUserRole();
  }, [clubId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Club Settings
          </CardTitle>
          <CardDescription>
            Manage your club settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Club Settings
        </CardTitle>
        <CardDescription>
          Manage your club settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Danger Zone</h4>
            <p className="text-sm text-muted-foreground mb-4">
              These actions are irreversible. Please proceed with caution.
            </p>
            {userRole === "admin" ? (
              <DeleteClubModal clubId={clubId} clubName={clubName} />
            ) : (
              <p className="text-sm text-muted-foreground">
                Only club administrators can delete the club.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
