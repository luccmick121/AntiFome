"use client";

import {
  BreadcrumbItem as HeroBreadcrumbItem,
  Breadcrumbs as HeroBreadcrumbs,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export type BreadcrumbsProps = {
  children?: React.ReactNode;
  className?: string;
  classNames?: Record<string, string | undefined>;
  [key: string]: unknown;
};

function Breadcrumbs({ className, classNames, ...props }: BreadcrumbsProps) {
  return (
    <HeroBreadcrumbs
      radius="sm"
      className={className}
      classNames={{
        base: cn("text-sm", classNames?.base),
        list: cn("gap-1", classNames?.list),
        separator: cn("text-foreground-300", classNames?.separator),
        ellipsis: cn("text-foreground-300", classNames?.ellipsis),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Breadcrumbs.displayName = "Breadcrumbs";

const BreadcrumbItem = HeroBreadcrumbItem;

export { BreadcrumbItem, Breadcrumbs };
