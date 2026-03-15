"use client";

import * as React from "react";
import { Progress as HeroProgress } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends Omit<React.ComponentProps<typeof HeroProgress>, "radius"> {}

function Progress({ className, classNames, ...props }: ProgressProps) {
  const hasAccessibleLabel =
    props.label !== undefined ||
    props["aria-label"] !== undefined ||
    props["aria-labelledby"] !== undefined;

  return (
    <HeroProgress
      radius="sm"
      className={className}
      aria-label={hasAccessibleLabel ? props["aria-label"] : "Indicador de progresso"}
      classNames={{
        base: cn("gap-2", classNames?.base),
        label: cn("text-sm font-medium text-foreground", classNames?.label),
        value: cn("text-sm font-semibold text-foreground", classNames?.value),
        track: cn("bg-content3 shadow-inner", classNames?.track),
        indicator: cn("shadow-none", classNames?.indicator),
        ...classNames,
      }}
      {...props}
    />
  );
}

Progress.displayName = "Progress";

export { Progress };
