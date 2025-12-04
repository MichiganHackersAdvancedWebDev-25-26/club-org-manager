interface DescriptionSectionProps {
  description: string | null | undefined;
}

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  if (!description) {
    return (
      <p className="text-muted-foreground italic">No description provided</p>
    );
  }

  return <p className="text-muted-foreground">{description}</p>;
};

export default DescriptionSection;
