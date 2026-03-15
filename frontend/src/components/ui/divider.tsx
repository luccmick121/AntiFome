"use client";

import { Divider as HeroDivider } from "@heroui/react";
import { cn } from "@/lib/utils";

export type DividerProps = {
  className?: string;
  [key: string]: unknown;
};

function Divider({ className, ...props }: DividerProps) {
  return <HeroDivider className={cn("bg-default-200", className)} {...(props as Record<string, unknown>)} />;
}

Divider.displayName = "Divider";

export { Divider };
