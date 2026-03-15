"use client";

import { Kbd as HeroKbd } from "@heroui/react";

const AnyKbd = HeroKbd as unknown as (props: Record<string, unknown>) => JSX.Element;

export type KbdProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Kbd(props: KbdProps) {
  return <AnyKbd {...(props as Record<string, unknown>)} />;
}

Kbd.displayName = "Kbd";

export { Kbd };
