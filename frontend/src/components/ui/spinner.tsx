"use client";

import * as React from "react";
import { Spinner as HeroSpinner } from "@heroui/react";
import { cn } from "@/lib/utils";

export type SpinnerProps = {
  className?: string;
  classNames?: Record<string, string | undefined>;
  label?: React.ReactNode;
  color?: string;
  [key: string]: unknown;
};

function Spinner({ className, classNames, ...props }: SpinnerProps) {
  return (
    <HeroSpinner
      className={className}
      classNames={{
        wrapper: cn("text-primary", classNames?.wrapper),
        circle1: cn("border-b-primary", classNames?.circle1),
        circle2: cn("border-b-primary/30", classNames?.circle2),
        label: cn("text-sm text-foreground-500", classNames?.label),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };
