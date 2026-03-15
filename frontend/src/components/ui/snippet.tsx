"use client";

import { Snippet as HeroSnippet } from "@heroui/react";
import { cn } from "@/lib/utils";

export type SnippetProps = {
  children?: React.ReactNode;
  className?: string;
  classNames?: Record<string, string | undefined>;
  [key: string]: unknown;
};

function Snippet({ className, classNames, ...props }: SnippetProps) {
  return (
    <HeroSnippet
      radius="sm"
      className={className}
      classNames={{
        base: cn("border border-default-200 bg-content2 shadow-none", classNames?.base),
        pre: cn("font-mono text-xs text-foreground", classNames?.pre),
        copyButton: cn("text-foreground-500 hover:bg-content3", classNames?.copyButton),
        symbol: cn("text-foreground-400", classNames?.symbol),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Snippet.displayName = "Snippet";

export { Snippet };
