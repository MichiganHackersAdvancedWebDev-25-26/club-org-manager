"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  subheading?: string;
  items?: FaqItem[];
}

const defaultFaqs = [
  {
    id: "faq-1",
    question: "Is there a limit to how many members a club can have?",
    answer: "No, clubs can grow and scale as large as needed. ClubOrg is built to handle organizations of any size.",
  },
  {
    id: "faq-2",
    question: "Can this manage multiple clubs at once?",
    answer:
      "Yes, the app supports multiple clubs and/or organizations, each with its own members, events, announcements, and settings.",
  },
  {
    id: "faq-3",
    question: "Can I assign different roles to members?",
    answer:
      "Absolutely! You can set executive roles such as President or Treasurer, general roles, or create custom positions tailored to your club's needs.",
  },
  {
    id: "faq-4",
    question: "Is ClubOrg free to use?",
    answer:
      "Yes, ClubOrg is completely free for all campus clubs. We believe in empowering student organizations without financial barriers.",
  },
  {
    id: "faq-5",
    question: "How do I get my club started on ClubOrg?",
    answer:
      "Simply sign up with your campus email, create your club profile, and start inviting members. It takes less than 5 minutes to get set up!",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Faq = ({
  className,
  heading = "Frequently asked questions",
  subheading = "Everything you need to know about ClubOrg",
  items = defaultFaqs,
  ...props
}: FaqProps & React.ComponentProps<"section">) => {
  return (
    <section
      className={cn("container max-w-3xl space-y-12", className)}
      {...props}
    >
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{heading}</h2>
        <p className="text-muted-foreground text-lg">{subheading}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <motion.div key={item.id} variants={itemVariants}>
              <AccordionItem
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 bg-gradient-to-b from-background to-muted/20 data-[state=open]:border-indigo-500/30 data-[state=open]:shadow-lg data-[state=open]:shadow-indigo-500/5 transition-all duration-300"
              >
                <AccordionTrigger className="font-semibold hover:no-underline py-5 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export { Faq };
