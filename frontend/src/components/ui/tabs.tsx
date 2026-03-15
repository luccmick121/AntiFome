"use client";

import * as React from "react";
import { Tab as HeroTab, Tabs as HeroTabs } from "@heroui/react";
import { cn } from "@/lib/utils";

export interface TabsProps
  extends Omit<React.ComponentProps<typeof HeroTabs>, "radius"> {}

function Tabs({ className, classNames, ...props }: TabsProps) {
  return (
    <HeroTabs
      radius="sm"
      className={className}
      classNames={{
        tabList: cn(
          "gap-2 rounded-[var(--radius-md)] border border-default-200 bg-content2 p-1",
          classNames?.tabList,
        ),
        cursor: cn("bg-primary shadow-none", classNames?.cursor),
        tab: cn(
          "h-11 rounded-[calc(var(--radius-md)-2px)] px-4 data-[hover-unselected=true]:bg-content3",
          classNames?.tab,
        ),
        tabContent: cn(
          "text-sm font-medium group-data-[selected=true]:text-primary",
          classNames?.tabContent,
        ),
        panel: cn("px-0 pt-6", classNames?.panel),
        ...classNames,
      }}
      {...props}
    />
  );
}

Tabs.displayName = "Tabs";

const Tab = HeroTab;

export { Tab, Tabs };
