import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  items?: FaqItem[];
}

const defaultFaqs = [
  {
    id: "faq-1",
    question: "Is there a limit to how many members a club can have?",
    answer: "No, clubs can grow and scale as large as needed.",
  },
  {
    id: "faq-2",
    question: "Can this manage multiple clubs at once?",
    answer:
      "Yes, the app supports multiple clubs and/or organizations, each with its own members, events, announcements, etc.",
  },
  {
    id: "faq-3",
    question: "Can I assign different roles to members?",
    answer:
      "Yes, you can set executive roles such as President or Treasurer, general roles, or anything else you'd like!",
  },
];

const Faq = ({
  className,
  heading = "Frequently asked questions",
  items = defaultFaqs,
  ...props
}: FaqProps & React.ComponentProps<"section">) => {
  return (
    <section
      className={cn("container max-w-3xl space-y-4 md:space-y-10", className)}
      {...props}
    >
      <h1 className="text-3xl font-semibold md:text-4xl">{heading}</h1>
      <Accordion type="single" collapsible>
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export { Faq };
