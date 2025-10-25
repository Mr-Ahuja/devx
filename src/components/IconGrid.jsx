import React from 'react'
import { tools } from './registry.jsx'

function navigateToTool(key) {
  const url = new URL(window.location.href)
  url.searchParams.set('tool', key)
  url.searchParams.delete('mode')
  url.searchParams.delete('a')
  url.searchParams.delete('b')
  window.location.href = url.toString()
}

export function IconGrid() {
  const items = Object.entries(tools)
    .filter(([_, t]) => t.phase <= 1) // show MVP tools by default
    .map(([key, t]) => ({ key, ...t }))

  return (
    <div className="card">
      <h2>Toolbox</h2>
      <p className="sublead">Pick a tool to get started.</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '14px',
        marginTop: '16px'
      }}>
        {items.map(({ key, label, Icon }) => (
          <button key={key} className="btn" onClick={() => navigateToTool(key)}
            aria-label={`Open ${label}`} style={{ justifyContent: 'flex-start' }}>
            <span className="icon"><Icon /></span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
