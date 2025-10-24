import React from "react";
import { Button } from "../ui/button";
import { joinClub } from "./action";

const JoinButton = ({
  clubId,
  onChange,
}: {
  clubId: string;
  onChange: () => void;
}) => {
  // Handle join club action
  const handleJoin = async () => {
    try {
      const res = await joinClub(clubId);
      console.log(res);
      console.log("Joined club:", clubId);
      onChange();
    } catch (error) {
      console.error("Error joining club:", error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="w-24 bg-green-400 font-semibold"
        onClick={handleJoin}
      >
        Join
      </Button>
    </>
  );
};

export default JoinButton;
