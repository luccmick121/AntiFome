"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand as HeroNavbarBrand,
  NavbarContent as HeroNavbarContent,
  NavbarItem as HeroNavbarItem,
  NavbarMenu as HeroNavbarMenu,
  NavbarMenuItem as HeroNavbarMenuItem,
} from "@heroui/react";
import { cn } from "@/lib/utils";

const AnyNavbar = HeroNavbar as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyNavbarBrand = HeroNavbarBrand as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyNavbarContent = HeroNavbarContent as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyNavbarItem = HeroNavbarItem as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyNavbarMenu = HeroNavbarMenu as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyNavbarMenuItem = HeroNavbarMenuItem as unknown as (props: Record<string, unknown>) => JSX.Element;

export type NavbarProps = {
  children?: React.ReactNode;
  className?: string;
  classNames?: Record<string, string | undefined>;
  [key: string]: unknown;
};

function Navbar({ className, classNames, ...props }: NavbarProps) {
  return (
    <AnyNavbar
      maxWidth="full"
      isBordered
      className={className}
      classNames={{
        base: cn("rounded-[var(--radius-md)] border border-default-200 bg-white shadow-panel-sm", classNames?.base),
        wrapper: cn("px-4 sm:px-5", classNames?.wrapper),
        brand: cn("gap-2", classNames?.brand),
        content: cn("gap-3", classNames?.content),
        item: cn("text-sm text-foreground-600", classNames?.item),
        menu: cn("rounded-[var(--radius-md)] border border-default-200 bg-white shadow-panel-md", classNames?.menu),
        ...classNames,
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}

Navbar.displayName = "Navbar";

function NavbarBrand(props: NavbarProps) {
  return <AnyNavbarBrand {...(props as Record<string, unknown>)} />;
}

NavbarBrand.displayName = "NavbarBrand";

function NavbarContent(props: NavbarProps) {
  return <AnyNavbarContent {...(props as Record<string, unknown>)} />;
}

NavbarContent.displayName = "NavbarContent";

function NavbarItem(props: NavbarProps) {
  return <AnyNavbarItem {...(props as Record<string, unknown>)} />;
}

NavbarItem.displayName = "NavbarItem";

function NavbarMenu(props: NavbarProps) {
  return <AnyNavbarMenu {...(props as Record<string, unknown>)} />;
}

NavbarMenu.displayName = "NavbarMenu";

function NavbarMenuItem(props: NavbarProps) {
  return <AnyNavbarMenuItem {...(props as Record<string, unknown>)} />;
}

NavbarMenuItem.displayName = "NavbarMenuItem";

export { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem };
