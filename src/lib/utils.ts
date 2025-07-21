import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserInitials = (name?: string | null): string => {
  if (!name) return "U";

  const names = name.split(" ");
  if (names.length === 1) {
    return names[0]?.charAt(0).toUpperCase() ?? "U";
  }

  const firstInitial = names[0]?.charAt(0).toUpperCase();
  const lastInitial = names[names.length - 1]?.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};
