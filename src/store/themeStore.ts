import { create } from 'zustand'

interface ThemeState {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false
  const stored = window.localStorage.getItem('hr-dashboard-theme')
  if (stored) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: getInitialTheme(),
  toggleDarkMode: () => {
    const next = !get().isDarkMode
    window.localStorage.setItem('hr-dashboard-theme', next ? 'dark' : 'light')
    set({ isDarkMode: next })
  },
}))
