"use client";

import * as React from "react";
import { Textarea as HeroTextarea } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends Omit<React.ComponentProps<typeof HeroTextarea>, "variant" | "radius"> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, classNames, ...props }, ref) => {
    return (
      <HeroTextarea
        ref={ref}
        variant="bordered"
        radius="sm"
        className={className}
        classNames={{
          base: cn("w-full", classNames?.base),
          inputWrapper: cn(
            "border-default-300 bg-white shadow-none data-[hover=true]:border-primary data-[focus=true]:border-danger",
            classNames?.inputWrapper,
          ),
          input: cn("text-sm text-foreground placeholder:text-foreground-400", classNames?.input),
          label: cn("text-sm font-medium text-foreground", classNames?.label),
          description: cn("text-xs text-foreground-500", classNames?.description),
          errorMessage: cn("text-xs text-danger", classNames?.errorMessage),
          ...classNames,
        }}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
