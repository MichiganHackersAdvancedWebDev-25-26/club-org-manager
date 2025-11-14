import React from "react";

const DescriptionSection = ({
  description,
}: {
  description: string | undefined;
}) => {
  return <p className="text-muted-foreground">{description}</p>;
};

export default DescriptionSection;
