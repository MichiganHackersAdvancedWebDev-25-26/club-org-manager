"use client";
import React from "react";
import LeaveButton from "./LeaveButton";
import JoinButton from "./JoinButton";

const DualButton = ({
  clubId,
  isLoggedIn,
  isMember,
  onChange,
}: {
  clubId: string;
  isLoggedIn: boolean;
  isMember: boolean;
  onChange: () => void;
}) => {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {isMember ? (
        <LeaveButton clubId={clubId} onChange={onChange} />
      ) : (
        <JoinButton clubId={clubId} onChange={onChange} />
      )}
    </>
  );
};

export default DualButton;
