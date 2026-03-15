"use client";

import { Link as HeroLink } from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyLink = HeroLink as unknown as (props: Record<string, unknown>) => JSX.Element;

export type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

function Link({ className, ...props }: LinkProps) {
  return <AnyLink className={cn("text-primary underline-offset-4 hover:underline", className)} {...(props as Record<string, unknown>)} />;
}

Link.displayName = "Link";

export { Link };
