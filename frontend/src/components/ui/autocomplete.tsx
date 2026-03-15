"use client";

import {
  Autocomplete as HeroAutocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyAutocomplete = HeroAutocomplete as unknown as (props: Record<string, unknown>) => JSX.Element;

export type AutocompleteProps = {
  className?: string;
  classNames?: Record<string, string | undefined>;
  [key: string]: unknown;
};

function Autocomplete({ className, classNames, popoverProps, ...props }: AutocompleteProps & { popoverProps?: Record<string, unknown> }) {
  return (
    <AnyAutocomplete
      variant="bordered"
      radius="sm"
      className={className}
      classNames={{
        base: cn("w-full", classNames?.base),
        selectorButton: cn("text-foreground-400", classNames?.selectorButton),
        clearButton: cn("text-foreground-400", classNames?.clearButton),
        endContentWrapper: cn("gap-1", classNames?.endContentWrapper),
        listbox: cn("text-sm text-foreground", classNames?.listbox),
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
      {...(props as Record<string, unknown>)}
    />
  );
}

Autocomplete.displayName = "Autocomplete";

export { Autocomplete, AutocompleteItem, AutocompleteSection };
