import { cn } from "@/lib/utils";
import { MessagesSquare, PersonStanding, Zap } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  heading?: string;
  subheading?: string;
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    title: "Member Directory",
    description: "Keep track of all members in one place",
    icon: <PersonStanding className="size-8 @lg:size-8" />,
  },
  {
    title: "Event Calendar",
    description: "Schedule meetings, events, and deadlines with reminders.",
    icon: <Zap className="size-8 @lg:size-8" />,
  },
  {
    title: "Announcements Board",
    description: "Share important updates so everyone's on the same page.",
    icon: <MessagesSquare className="size-8 @lg:size-8" />,
  },
];

const Feature = ({
  className,
  heading = "Our Features",
  features = defaultFeatures,
  ...props
}: FeatureProps & React.ComponentProps<"section">) => {
  return (
    <section
      className={cn("@container container max-w-5xl space-y-12 @lg:space-y-20", className)}
      {...props}
    >
      <h2 className="text-center text-3xl font-medium @lg:pl-5 @lg:text-4xl">
        {heading}
      </h2>
      <div className="mx-auto grid gap-x-20 gap-y-8 @lg:grid-cols-2 @lg:gap-y-6">
        {features.map((feature, idx) => (
          <div className="flex gap-6 rounded-lg @lg:block @lg:p-5" key={idx}>
            <span className="bg-accent mb-8 flex size-10 shrink-0 items-center justify-center rounded-full @lg:size-12">
              {feature.icon}
            </span>
            <div>
              <h3 className="font-medium @lg:mb-2 @lg:text-xl">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm @lg:text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Feature };
