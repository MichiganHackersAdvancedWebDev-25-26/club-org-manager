"use client";
import React, { useEffect, useState } from "react";
import LeaveButton from "./LeaveButton";
import JoinButton from "./JoinButton";
import { createClient } from "@/utils/supabase/client";

const DualButton = ({ clubId }: { clubId: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const checkStatus = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
    if (user) {
      const { data: membership } = await supabase
        .from("memberships")
        .select("*")
        .eq("club_id", clubId)
        .single();
      setIsMember(!!membership);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (loading || !isLoggedIn) {
    return null;
  }

  return (
    <>
      {isMember ? (
        <LeaveButton clubId={clubId} onChange={checkStatus} />
      ) : (
        <JoinButton clubId={clubId} onChange={checkStatus} />
      )}
    </>
  );
};

export default DualButton;
