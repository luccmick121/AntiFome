"use client";

import { Calendar as HeroCalendar, RangeCalendar as HeroRangeCalendar } from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyCalendar = HeroCalendar as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyRangeCalendar = HeroRangeCalendar as unknown as (props: Record<string, unknown>) => JSX.Element;

type CalendarClassNames = Record<string, string | undefined>;

type CalendarProps = {
  className?: string;
  classNames?: CalendarClassNames;
  [key: string]: unknown;
};

function buildCalendarClassNames(classNames?: CalendarClassNames) {
  return {
    base: cn("rounded-[var(--radius-md)] border border-default-200 bg-white p-2 shadow-panel-sm", classNames?.base),
    headerWrapper: cn("pb-3", classNames?.headerWrapper),
    title: cn("text-sm font-medium text-foreground", classNames?.title),
    gridHeader: cn("text-foreground-400", classNames?.gridHeader),
    cellButton: cn("data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground", classNames?.cellButton),
    ...classNames,
  };
}

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <AnyCalendar
      className={className}
      classNames={buildCalendarClassNames(classNames)}
      {...(props as Record<string, unknown>)}
    />
  );
}

Calendar.displayName = "Calendar";

function RangeCalendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <AnyRangeCalendar
      className={className}
      classNames={buildCalendarClassNames(classNames)}
      {...(props as Record<string, unknown>)}
    />
  );
}

RangeCalendar.displayName = "RangeCalendar";

export { Calendar, RangeCalendar };
