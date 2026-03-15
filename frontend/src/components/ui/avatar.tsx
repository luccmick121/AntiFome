"use client";

import { Avatar as HeroAvatar } from "@heroui/react";

const AnyAvatar = HeroAvatar as unknown as (props: Record<string, unknown>) => JSX.Element;

export type AvatarProps = {
  [key: string]: unknown;
};

function Avatar(props: AvatarProps) {
  return <AnyAvatar {...(props as Record<string, unknown>)} />;
}

Avatar.displayName = "Avatar";

export { Avatar };
