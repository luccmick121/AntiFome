"use client";

import { Checkbox as HeroCheckbox, CheckboxGroup as HeroCheckboxGroup } from "@heroui/react";

const AnyCheckbox = HeroCheckbox as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyCheckboxGroup = HeroCheckboxGroup as unknown as (props: Record<string, unknown>) => JSX.Element;

export type CheckboxProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Checkbox(props: CheckboxProps) {
  return <AnyCheckbox radius="sm" {...(props as Record<string, unknown>)} />;
}

Checkbox.displayName = "Checkbox";

function CheckboxGroup(props: CheckboxProps) {
  return <AnyCheckboxGroup {...(props as Record<string, unknown>)} />;
}

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };
