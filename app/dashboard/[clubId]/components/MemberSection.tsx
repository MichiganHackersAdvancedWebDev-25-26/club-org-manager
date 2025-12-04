import { ClubUser } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MemberSectionProps {
  members: ClubUser[];
}

const MemberSection = ({ members }: MemberSectionProps) => {
  if (members.length === 0) {
    return <p className="text-muted-foreground">No members yet</p>;
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {members.map((member) => (
        <Card key={member.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="py-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">{member.name}</CardTitle>
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
          <CardContent className="py-2">
            <p className="text-sm text-muted-foreground">
              Joined {new Date(member.joined_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MemberSection;
