"use client";

import * as React from "react";
import { Pagination as HeroPagination } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface PaginationProps
  extends Omit<React.ComponentProps<typeof HeroPagination>, "radius"> {}

function Pagination({ className, classNames, ...props }: PaginationProps) {
  return (
    <HeroPagination
      radius="sm"
      className={className}
      classNames={{
        wrapper: cn("gap-1", classNames?.wrapper),
        item: cn(
          "border border-default-200 bg-white text-foreground shadow-none data-[hover=true]:bg-content2",
          classNames?.item,
        ),
        cursor: cn("bg-primary text-primary-foreground shadow-panel-sm", classNames?.cursor),
        prev: cn("border border-default-200 bg-white text-foreground shadow-none", classNames?.prev),
        next: cn("border border-default-200 bg-white text-foreground shadow-none", classNames?.next),
        ...classNames,
      }}
      {...props}
    />
  );
}

Pagination.displayName = "Pagination";

export { Pagination };
