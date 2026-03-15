"use client";

import { User as HeroUser } from "@heroui/react";

const AnyUser = HeroUser as unknown as (props: Record<string, unknown>) => JSX.Element;

export type UserProps = {
  [key: string]: unknown;
};

function User(props: UserProps) {
  return <AnyUser {...(props as Record<string, unknown>)} />;
}

User.displayName = "User";

export { User };
