import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/theme.css'

// CSS var for viewport height to handle mobile address bar
function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}
setVH()
window.addEventListener('resize', setVH)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

