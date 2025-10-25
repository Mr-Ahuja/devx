import React, { useEffect, useState } from 'react'

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme())
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return (
    <button className="btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" style={{ float: 'right' }}>
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  )
}

