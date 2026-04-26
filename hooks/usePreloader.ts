'use client'

import { create } from 'zustand'

interface PreloaderStore {
  isVisible: boolean
  show: () => void
  hide: () => void
}

export const usePreloader = create<PreloaderStore>((set) => ({
  isVisible: true,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}))
