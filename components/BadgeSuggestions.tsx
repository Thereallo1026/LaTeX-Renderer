import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fragment } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

const examples = [
  { type: "Calculus", expression: "\\int_0^1 x^2 \\, dx" },
  { type: "Differentials", expression: "\\frac{dy}{dx} = y" },
  {
    type: "Linear Algebra",
    expression: "\\mathbf{A} \\mathbf{x} = \\mathbf{b}",
  },
];

export default function BadgeSuggestions({
  onBadgeClick,
}: {
  onBadgeClick: (expression: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <TooltipProvider>
        {examples.map((example) => (
          <StylizedBadge
            text={example.type}
            key={example.type}
            expression={example.expression}
            onClick={() => {
              onBadgeClick(example.expression);
            }}
          />
        ))}
      </TooltipProvider>
    </div>
  );
}

function StylizedBadge({
  text,
  expression,
  onClick,
}: {
  text: string;
  expression: string;
  onClick: () => void;
}) {
  return (
    <Fragment>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className="flex rounded-full bg-white bg-opacity-10 space-x-1 hover:cursor-pointer items-center justify-center"
            onClick={onClick}
          >
            <p className="text-white text-opacity-80">{text}</p>
            <Icon icon="mdi:arrow-up" className="text-sm rotate-45" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{expression}</p>
        </TooltipContent>
      </Tooltip>
    </Fragment>
  );
}
