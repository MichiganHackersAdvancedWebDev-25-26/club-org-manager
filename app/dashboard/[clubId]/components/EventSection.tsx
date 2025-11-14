import React from "react";
import { Event } from "@/lib/types";

const EventSection = ({ events }: { events: Event[] | null }) => {
  return (
    <div className="text-muted-foreground">
      {events && events.map((event) => <div key={event.id}>{event.title}</div>)}
    </div>
  );
};

export default EventSection;
