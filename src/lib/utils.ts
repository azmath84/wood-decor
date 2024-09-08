import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import { z } from "zod";

const urlSchema = z.string().url({
  message: "Please enter a valid URL.",
});

export function validateUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}