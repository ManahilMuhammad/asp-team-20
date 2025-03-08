import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
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