import { Club } from "@/lib/types";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";
import DualButton from "@/components/custom/DualButton";

const OrgCard = ({ org }: { org: Club }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">
          <Link
            href={`/org/${org.id}`}
            className="hover:text-primary transition-colors"
          >
            {org.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created {new Date(org.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{Math.floor(Math.random() * 100)} members</span>
          </div>
          <p>{org.description || "No description available"}</p>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button asChild size="sm" className="w-24 bg-blue-400 font-semibold">
            <Link href={`/org/${org.id}`}>View Club</Link>
          </Button>
          <DualButton clubId={org.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrgCard;
