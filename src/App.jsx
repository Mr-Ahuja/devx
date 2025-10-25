import React, { useEffect, useRef } from 'react'
import { ToolRouter } from './components/ToolRouter.jsx'
import { IconGrid } from './components/IconGrid.jsx'
import { mountConstellation } from './lib/constellation.js'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

export default function App() {
  const query = useQuery()
  const tool = query.get('tool')
  const canvasRef = useRef(null)

  useEffect(() => {
    const dispose = mountConstellation(canvasRef.current || document.createElement('canvas'))
    return () => { dispose && dispose() }
  }, [])

  return (
    <div className="page">
      <canvas ref={canvasRef} className="bg-constellation" aria-hidden="true"></canvas>
      <header className="content" style={{paddingBottom: 0, textAlign: 'center'}}>
        <img className="logo" src="logo.svg" alt="DevX logo" />
        <h1 className="title">DevX — Developer Tools</h1>
        <p className="sublead">Because every Dev deserves an X-factor.</p>
      </header>

      <main className="content">
        {!tool ? <IconGrid /> : <ToolRouter />}
      </main>

      <footer className="site-footer">
        <span>DevX by The Chosen One <a href="https://preetam.thechosenone.in/" target="_blank" rel="noopener noreferrer">Preetam Ahuja</a></span>
      </footer>
    </div>
  )
}
