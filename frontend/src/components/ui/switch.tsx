"use client";

import { Switch as HeroSwitch } from "@heroui/react";

const AnySwitch = HeroSwitch as unknown as (props: Record<string, unknown>) => JSX.Element;

export type SwitchProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Switch(props: SwitchProps) {
  return <AnySwitch {...(props as Record<string, unknown>)} />;
}

Switch.displayName = "Switch";

export { Switch };
