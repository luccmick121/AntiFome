"use client";

import {
  DatePicker as HeroDatePicker,
  DateRangePicker as HeroDateRangePicker,
} from "@heroui/react";
import { cn } from "@/lib/utils";

type PickerClassNames = Record<string, string | undefined>;

type BasePickerProps = {
  className?: string;
  classNames?: PickerClassNames;
  popoverProps?: Record<string, unknown>;
  [key: string]: unknown;
};

function pickerClassNames(classNames?: PickerClassNames) {
  return {
    base: cn("w-full", classNames?.base),
    inputWrapper: cn(
      "border-default-300 bg-white shadow-none data-[hover=true]:border-primary data-[focus=true]:border-danger",
      classNames?.inputWrapper,
    ),
    selectorButton: cn("text-foreground-400", classNames?.selectorButton),
    label: cn("text-sm font-medium text-foreground", classNames?.label),
    ...classNames,
  };
}

function DatePicker({ className, classNames, popoverProps, ...props }: BasePickerProps) {
  return (
    <HeroDatePicker
      radius="sm"
      className={className}
      classNames={pickerClassNames(classNames)}
      popoverProps={{
        classNames: {
          content: "rounded-[var(--radius-md)] border border-default-200 shadow-panel-md",
        },
        ...popoverProps,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

DatePicker.displayName = "DatePicker";

function DateRangePicker({ className, classNames, popoverProps, ...props }: BasePickerProps) {
  return (
    <HeroDateRangePicker
      radius="sm"
      className={className}
      classNames={pickerClassNames(classNames)}
      popoverProps={{
        classNames: {
          content: "rounded-[var(--radius-md)] border border-default-200 shadow-panel-md",
        },
        ...popoverProps,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

DateRangePicker.displayName = "DateRangePicker";

export { DatePicker, DateRangePicker };
