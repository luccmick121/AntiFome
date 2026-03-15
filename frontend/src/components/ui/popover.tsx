"use client";

import {
  Popover as HeroPopover,
  PopoverContent as HeroPopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyPopover = HeroPopover as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyPopoverContent = HeroPopoverContent as unknown as (props: Record<string, unknown>) => JSX.Element;

export type PopoverProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Popover(props: PopoverProps) {
  return <AnyPopover {...(props as Record<string, unknown>)} />;
}

Popover.displayName = "Popover";

type PopoverContentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

function PopoverContent({ className, ...props }: PopoverContentProps) {
  return (
    <AnyPopoverContent
      className={cn("rounded-[var(--radius-md)] border border-default-200 bg-white shadow-panel-md", className)}
      {...(props as Record<string, unknown>)}
    />
  );
}

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverContent, PopoverTrigger };
