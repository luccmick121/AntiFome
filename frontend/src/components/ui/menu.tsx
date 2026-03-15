"use client";

import {
  Menu as HeroMenu,
  MenuItem as HeroMenuItem,
  MenuSection as HeroMenuSection,
} from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyMenu = HeroMenu as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyMenuItem = HeroMenuItem as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyMenuSection = HeroMenuSection as unknown as (props: Record<string, unknown>) => JSX.Element;

export type MenuProps = {
  children?: React.ReactNode;
  className?: string;
  classNames?: Record<string, string | undefined>;
  [key: string]: unknown;
};

function Menu({ className, classNames, ...props }: MenuProps) {
  return (
    <AnyMenu
      className={className}
      classNames={{
        base: cn("rounded-[var(--radius-md)] bg-transparent p-0", classNames?.base),
        list: cn("gap-1", classNames?.list),
        emptyContent: cn("text-sm text-foreground-500", classNames?.emptyContent),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Menu.displayName = "Menu";

function MenuItem({ className, ...props }: MenuProps) {
  return (
    <AnyMenuItem
      className={cn(
        "rounded-[var(--radius-sm)] text-sm text-foreground data-[hover=true]:bg-default-100 data-[focus-visible=true]:outline-none",
        className,
      )}
      {...(props as Record<string, unknown>)}
    />
  );
}

MenuItem.displayName = "MenuItem";

function MenuSection(props: MenuProps) {
  return <AnyMenuSection {...(props as Record<string, unknown>)} />;
}

MenuSection.displayName = "MenuSection";

export { Menu, MenuItem, MenuSection };
