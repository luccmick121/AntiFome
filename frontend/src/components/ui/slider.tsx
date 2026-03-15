"use client";

import { Slider as HeroSlider } from "@heroui/react";

const AnySlider = HeroSlider as unknown as (props: Record<string, unknown>) => JSX.Element;

export type SliderProps = {
  [key: string]: unknown;
};

function Slider(props: SliderProps) {
  return <AnySlider {...(props as Record<string, unknown>)} />;
}

Slider.displayName = "Slider";

export { Slider };
