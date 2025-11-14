import React from "react";
import { ClubUser } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const MemberSection = ({ members }: { members: ClubUser[] }) => {
  return (
    <div>
      <ul>
        {members.map((member, index) => (
          <>
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      member.role === "admin"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : member.role === "officer"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  Joined: {new Date(member.joined_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
            <li key={index}>
              {member.name}|{member.role}
            </li>
          </>
        ))}
      </ul>
      {/* <p className="text-muted-foreground">No members yet</p> */}
    </div>
  );
};
export default MemberSection;
