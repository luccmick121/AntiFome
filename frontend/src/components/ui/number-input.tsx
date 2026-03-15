"use client";

import { NumberInput as HeroNumberInput } from "@heroui/react";

const AnyNumberInput = HeroNumberInput as unknown as (props: Record<string, unknown>) => JSX.Element;

export type NumberInputProps = {
  [key: string]: unknown;
};

function NumberInput(props: NumberInputProps) {
  return <AnyNumberInput radius="sm" {...(props as Record<string, unknown>)} />;
}

NumberInput.displayName = "NumberInput";

export { NumberInput };
