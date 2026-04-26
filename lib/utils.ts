import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT_CUBIC = [0.76, 0, 0.24, 1] as const
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const
