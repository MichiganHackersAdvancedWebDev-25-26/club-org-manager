"use client";

import { cn } from "@/lib/utils";
import { MessagesSquare, PersonStanding, Zap, Calendar, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

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
    description: "Keep track of all members in one place with profiles, roles, and contact info.",
    icon: <PersonStanding className="size-6" />,
  },
  {
    title: "Event Calendar",
    description: "Schedule meetings, events, and deadlines with automatic reminders.",
    icon: <Calendar className="size-6" />,
  },
  {
    title: "Announcements",
    description: "Share important updates so everyone's always on the same page.",
    icon: <MessagesSquare className="size-6" />,
  },
  {
    title: "Role Management",
    description: "Assign positions like President, Treasurer, or custom roles easily.",
    icon: <Shield className="size-6" />,
  },
  {
    title: "Multi-Club Support",
    description: "Manage multiple clubs from a single dashboard seamlessly.",
    icon: <Users className="size-6" />,
  },
  {
    title: "Quick Actions",
    description: "Streamlined workflows for common tasks to save you time.",
    icon: <Zap className="size-6" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Feature = ({
  className,
  heading = "Everything you need to manage your clubs",
  subheading = "Powerful features designed to make club management effortless",
  features = defaultFeatures,
  ...props
}: FeatureProps & React.ComponentProps<"section">) => {
  return (
    <section
      className={cn("container max-w-6xl space-y-16", className)}
      {...props}
    >
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {heading}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subheading}
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="group relative p-6 rounded-2xl border border-border/50 bg-gradient-to-b from-background to-muted/20 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/20">
                {feature.icon}
              </span>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export { Feature };
