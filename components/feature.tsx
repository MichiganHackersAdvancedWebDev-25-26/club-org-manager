import {
  MessagesSquare,
  PersonStanding,
  Zap,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature17Props {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

const Feature = ({
  heading = "Our Features",
  subheading = "",
  features = [
    {
      title: "Member Directory",
      description:
        "Keep track of all members in one place",
      icon: <PersonStanding className="size-8 md:size-8" />,
    },
    {
      title: "Event Calendar",
      description:
        "Schedule meetings, events, and deadlines with reminders.",
      icon: <Zap className="size-8 md:size-8" />,
    },
    {
      title: "Announcements Board",
      description:
        "Share important updates so everyone's on the same page.",
      icon: <MessagesSquare className="size-8 md:size-8" />,
    },
    
  ],
}: Feature17Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">
          {subheading}
        </p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">{heading}</h2>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
