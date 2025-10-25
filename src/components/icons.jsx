import React from 'react'

const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconCheck = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path {...common} d="M5 13l4 4L19 7"/></svg>
)
export const IconCode = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline {...common} points="7,8 3,12 7,16"/>
    <polyline {...common} points="17,8 21,12 17,16"/>
  </svg>
)
export const IconSwap = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path {...common} d="M7 8h10m0 0-3-3m3 3-3 3M17 16H7m0 0 3 3m-3-3 3-3"/>
  </svg>
)
export const IconTrash = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="7" width="12" height="12" rx="1" {...common}/>
    <path {...common} d="M9 7V5h6v2M4 7h16"/>
  </svg>
)
export const IconLink = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path {...common} d="M10 13a3 3 0 0 1 0-6h3M14 11a3 3 0 0 1 0 6h-3"/>
  </svg>
)
export const IconHome = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path {...common} d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>
  </svg>
)
export const IconCompare = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="8" height="12" {...common}/>
    <rect x="13" y="6" width="8" height="12" {...common}/>
  </svg>
)
export const IconCopy = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="10" height="10" {...common}/>
    <rect x="5" y="5" width="10" height="10" {...common}/>
  </svg>
)
export const IconSpark = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path {...common} d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/>
  </svg>
)

// New icons for specific tools
export const IconGlobe = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" {...common}/>
    <path {...common} d="M3 12h18M12 3a16 16 0 0 1 0 18M12 3a16 16 0 0 0 0 18"/>
  </svg>
)
export const IconBase64 = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="6" height="6" {...common}/>
    <rect x="14" y="4" width="6" height="6" {...common}/>
    <rect x="4" y="14" width="6" height="6" {...common}/>
    <rect x="14" y="14" width="6" height="6" {...common}/>
  </svg>
)
export const IconUuid = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path {...common} d="M7 3v18M17 3v18M3 9h18M3 15h18"/>
  </svg>
)
