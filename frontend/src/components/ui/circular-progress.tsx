"use client";

import { CircularProgress as HeroCircularProgress } from "@heroui/react";

const AnyCircularProgress = HeroCircularProgress as unknown as (props: Record<string, unknown>) => JSX.Element;

export type CircularProgressProps = {
  [key: string]: unknown;
};

function CircularProgress(props: CircularProgressProps) {
  return <AnyCircularProgress {...(props as Record<string, unknown>)} />;
}

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };
