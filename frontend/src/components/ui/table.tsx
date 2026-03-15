"use client";

import * as React from "react";
import {
  Table as HeroTable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { cn } from "@/lib/utils";

type TableClassNames = Record<string, string | undefined>;

export type TableProps = React.PropsWithChildren<{
  className?: string;
  classNames?: TableClassNames;
  removeWrapper?: boolean;
  [key: string]: unknown;
}>;

function Table({ className, classNames, removeWrapper = true, ...props }: TableProps) {
  return (
    <HeroTable
      removeWrapper={removeWrapper}
      className={className}
      classNames={{
        wrapper: cn(
          "rounded-[var(--radius-md)] border border-default-200 bg-white p-0 shadow-panel-sm",
          classNames?.wrapper,
        ),
        table: cn("min-w-full", classNames?.table),
        th: cn(
          "bg-content2 text-xs uppercase tracking-[0.12em] text-foreground-500",
          classNames?.th,
        ),
        td: cn("py-4 text-sm text-foreground", classNames?.td),
        tr: cn("border-b border-default-100 last:border-b-0", classNames?.tr),
        emptyWrapper: cn("py-10 text-foreground-500", classNames?.emptyWrapper),
        loadingWrapper: cn("py-10", classNames?.loadingWrapper),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Table.displayName = "Table";

export { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow };
