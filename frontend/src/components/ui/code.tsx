"use client";

import { Code as HeroCode } from "@heroui/react";

const AnyCode = HeroCode as unknown as (props: Record<string, unknown>) => JSX.Element;

export type CodeProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Code(props: CodeProps) {
  return <AnyCode {...(props as Record<string, unknown>)} />;
}

Code.displayName = "Code";

export { Code };
