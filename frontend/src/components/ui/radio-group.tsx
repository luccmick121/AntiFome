"use client";

import { Radio as HeroRadio, RadioGroup as HeroRadioGroup } from "@heroui/react";

const AnyRadio = HeroRadio as unknown as (props: Record<string, unknown>) => JSX.Element;
const AnyRadioGroup = HeroRadioGroup as unknown as (props: Record<string, unknown>) => JSX.Element;

export type RadioGroupProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

function Radio(props: RadioGroupProps) {
  return <AnyRadio {...(props as Record<string, unknown>)} />;
}

Radio.displayName = "Radio";

function RadioGroup(props: RadioGroupProps) {
  return <AnyRadioGroup {...(props as Record<string, unknown>)} />;
}

RadioGroup.displayName = "RadioGroup";

export { Radio, RadioGroup };
