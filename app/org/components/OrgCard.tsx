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
        <CardDescription className="line-clamp-2">
          {org.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created {new Date(org.created_at).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{Math.floor(Math.random() * 100)} members</span>
          </div>

          <div className="pt-4">
            <Button asChild size="sm" className="w-auto px-6">
              <Link href={`/org/${org.id}`}>View Club</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrgCard;
