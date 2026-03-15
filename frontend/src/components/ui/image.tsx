"use client";

import { Image as HeroImage } from "@heroui/react";

const AnyImage = HeroImage as unknown as (props: Record<string, unknown>) => JSX.Element;

export type ImageProps = {
  [key: string]: unknown;
};

function Image(props: ImageProps) {
  return <AnyImage radius="sm" {...(props as Record<string, unknown>)} />;
}

Image.displayName = "Image";

export { Image };
