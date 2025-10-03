import { Club } from "@/lib/types";
import Link from "next/link";
import React from "react";

const OrgCard = ({ org }: { org: Club }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <Link href={`org/${org.id}`} className="hover:underline">
        <h2>{org.name}</h2>
      </Link>
      <p>{org.description}</p>
      <p>Created by: {org.created_by}</p>
      <p>Created at: {org.created_at}</p>
      <p>Member count: {Math.floor(Math.random() * 100)}</p>
    </div>
  );
};

export default OrgCard;
