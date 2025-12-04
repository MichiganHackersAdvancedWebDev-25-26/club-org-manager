import { Announcement } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnnouncementSectionProps {
  announcements: Announcement[];
}

const AnnouncementSection = ({ announcements }: AnnouncementSectionProps) => {
  if (announcements.length === 0) {
    return <p className="text-muted-foreground">No announcements yet</p>;
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {announcements.map((announcement) => (
        <Card
          key={announcement.id}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader className="py-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">{announcement.title}</CardTitle>
              <span className="text-xs text-muted-foreground">
                {new Date(announcement.created_at).toLocaleDateString()}
              </span>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {announcement.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementSection;
