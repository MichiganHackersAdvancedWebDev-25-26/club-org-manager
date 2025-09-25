import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "Is there a limit to how many members a club can have?",
      answer:
        "No, clubs can grow and scale as large as needed.",
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
  ],
}: Faq1Props) => {
  return (
    <section className="py-32">
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
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
      </div>
    </section>
  );
};

export { Faq1 };
