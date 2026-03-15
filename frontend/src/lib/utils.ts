import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina classes CSS de forma condicional e otimizada */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
