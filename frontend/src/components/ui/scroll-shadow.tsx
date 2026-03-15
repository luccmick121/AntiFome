"use client";

import { ScrollShadow as HeroScrollShadow } from "@heroui/react";

const AnyScrollShadow = HeroScrollShadow as unknown as (props: Record<string, unknown>) => JSX.Element;

export type ScrollShadowProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function ScrollShadow(props: ScrollShadowProps) {
  return <AnyScrollShadow {...(props as Record<string, unknown>)} />;
}

ScrollShadow.displayName = "ScrollShadow";

export { ScrollShadow };
