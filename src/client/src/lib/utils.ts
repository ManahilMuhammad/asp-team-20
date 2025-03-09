import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string => {
  if (!name) return "NF";

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join("");

  return initials;
};