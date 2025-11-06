import React from "react";
import { Button } from "../ui/button";
import { leaveClub } from "./action";

const LeaveButton = ({
  clubId,
  onChange,
}: {
  clubId: string;
  onChange: () => void;
}) => {
  // Handle leave club action
  const handleLeave = async () => {
    try {
      const res = await leaveClub(clubId);
      console.log(res);
      if (!res.error) {
        console.log("Left club:", clubId);
        onChange();
      } else {
        console.error("Error leaving club:", res.error);
      }
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="w-24 bg-red-400 font-semibold"
        onClick={handleLeave}
      >
        Leave
      </Button>
    </>
  );
};

export default LeaveButton;
