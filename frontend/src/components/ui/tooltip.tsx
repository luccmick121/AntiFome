"use client";

import * as React from "react";
import { Tooltip as HeroTooltip } from "@heroui/react";
import { cn } from "@/lib/utils";

export type TooltipProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  classNames?: Record<string, string | undefined>;
  [key: string]: unknown;
};

function Tooltip({ className, classNames, ...props }: TooltipProps) {
  return (
    <HeroTooltip
      radius="sm"
      delay={300}
      closeDelay={100}
      className={className}
      classNames={{
        base: cn("max-w-xs", classNames?.base),
        content: cn(
          "rounded-[var(--radius-md)] border border-default-200 bg-white px-3 py-2 text-sm text-foreground shadow-panel-md",
          classNames?.content,
        ),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
