"use client";

import { DateInput as HeroDateInput, TimeInput as HeroTimeInput } from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyDateInput = HeroDateInput as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyTimeInput = HeroTimeInput as unknown as (props: Record<string, unknown>) => JSX.Element;

type InputClassNames = Record<string, string | undefined>;

type BaseDateProps = {
  className?: string;
  classNames?: InputClassNames;
  [key: string]: unknown;
};

function buildClassNames(classNames?: InputClassNames) {
  return {
    base: cn("w-full", classNames?.base),
    inputWrapper: cn(
      "border-default-300 bg-white shadow-none data-[hover=true]:border-primary data-[focus=true]:border-danger",
      classNames?.inputWrapper,
    ),
    label: cn("text-sm font-medium text-foreground", classNames?.label),
    segment: cn("text-sm text-foreground", classNames?.segment),
    ...classNames,
  };
}

function DateInput({ className, classNames, ...props }: BaseDateProps) {
  return (
    <AnyDateInput
      radius="sm"
      className={className}
      classNames={buildClassNames(classNames)}
      {...(props as Record<string, unknown>)}
    />
  );
}

DateInput.displayName = "DateInput";

function TimeInput({ className, classNames, ...props }: BaseDateProps) {
  return (
    <AnyTimeInput
      radius="sm"
      className={className}
      classNames={buildClassNames(classNames)}
      {...(props as Record<string, unknown>)}
    />
  );
}

TimeInput.displayName = "TimeInput";

export { DateInput, TimeInput };
