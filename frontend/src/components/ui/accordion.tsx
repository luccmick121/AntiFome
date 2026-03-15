"use client";

import { Accordion as HeroAccordion, AccordionItem as HeroAccordionItem } from "@heroui/react";

const AnyAccordion = HeroAccordion as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyAccordionItem = HeroAccordionItem as unknown as (props: Record<string, unknown>) => JSX.Element;

export type AccordionProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Accordion(props: AccordionProps) {
  return <AnyAccordion {...(props as Record<string, unknown>)} />;
}

Accordion.displayName = "Accordion";

function AccordionItem(props: AccordionProps) {
  return <AnyAccordionItem {...(props as Record<string, unknown>)} />;
}

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem };
