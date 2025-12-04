import { Event } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock } from "lucide-react";

interface EventSectionProps {
  events: Event[];
}

const EventSection = ({ events }: EventSectionProps) => {
  if (events.length === 0) {
    return <p className="text-muted-foreground">No upcoming events</p>;
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="py-3">
            <CardTitle className="text-base">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2 space-y-2">
            {event.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(event.start_time).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {new Date(event.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventSection;
