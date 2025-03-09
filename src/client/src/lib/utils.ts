import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const formatProfileImgUrl = (avatar: string): string => {
  // avatar is a url reference to an online image
  if (avatar.startsWith('http')) return avatar;
  // default avatar being nutifit logo
  if (avatar === 'default') return "/nutrifit-logo.svg";
  // any other default avatar
  return `/base-avatars/${avatar}`;
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
