"use client";

import {
  Drawer as HeroDrawer,
  DrawerBody,
  DrawerContent as HeroDrawerContent,
  DrawerFooter,
  DrawerHeader as HeroDrawerHeader,
} from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyDrawer = HeroDrawer as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyDrawerContent = HeroDrawerContent as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyDrawerHeader = HeroDrawerHeader as unknown as (props: Record<string, unknown>) => JSX.Element;

export type DrawerProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Drawer(props: DrawerProps) {
  return (
    <AnyDrawer
      placement="right"
      classNames={{
        base: "rounded-none border-l border-default-200",
        backdrop: "bg-foreground/30 backdrop-blur-[1px]",
        closeButton: "text-foreground-500 hover:bg-default-100",
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Drawer.displayName = "Drawer";

type DrawerContentProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

function DrawerContent({ className, ...props }: DrawerContentProps) {
  return (
    <AnyDrawerContent
      className={cn("bg-white", className)}
      {...(props as Record<string, unknown>)}
    />
  );
}

DrawerContent.displayName = "DrawerContent";

function DrawerHeader({ className, ...props }: DrawerContentProps) {
  return (
    <AnyDrawerHeader
      className={cn("flex flex-col gap-1 border-b border-default-100 pb-4", className)}
      {...(props as Record<string, unknown>)}
    />
  );
}

DrawerHeader.displayName = "DrawerHeader";

export { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader };
