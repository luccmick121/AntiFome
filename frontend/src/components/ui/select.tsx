"use client";

import * as React from "react";
import { Select as HeroSelect, SelectItem, SelectSection } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends Omit<React.ComponentProps<typeof HeroSelect>, "variant" | "radius"> {}

function Select({ className, classNames, popoverProps, ...props }: SelectProps) {
  return (
    <HeroSelect
      variant="bordered"
      radius="sm"
      className={className}
      classNames={{
        base: cn("w-full", classNames?.base),
        trigger: cn(
          "border-default-300 bg-white shadow-none data-[hover=true]:border-primary data-[open=true]:border-primary data-[focus=true]:border-danger",
          classNames?.trigger,
        ),
        value: cn("text-sm text-foreground", classNames?.value),
        label: cn("text-sm font-medium text-foreground", classNames?.label),
        listboxWrapper: cn("p-1", classNames?.listboxWrapper),
        popoverContent: cn("rounded-[var(--radius-md)] border border-default-200 shadow-panel-md", classNames?.popoverContent),
        ...classNames,
      }}
      popoverProps={{
        classNames: {
          content: "rounded-[var(--radius-md)] border border-default-200 shadow-panel-md",
        },
        ...popoverProps,
      }}
      {...props}
    />
  );
}

Select.displayName = "Select";

export { Select, SelectItem, SelectSection };
