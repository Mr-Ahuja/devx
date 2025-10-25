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
  const [q, setQ] = React.useState('')
  const items = Object.entries(tools)
    .filter(([_, t]) => t.phase <= 2)
    .map(([key, t]) => ({ key, ...t }))
    .filter(item => item.label.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="card">
      <h2>Toolbox</h2>
      <p className="sublead">Pick a tool to get started.</p>
      <div style={{ marginTop: 8, marginBottom: 12 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search tools..."
          aria-label="Search tools"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px', marginTop: '16px' }}>
        {items.map(({ key, label, Icon }) => (
          <button key={key} className="btn tile" onClick={() => navigateToTool(key)} aria-label={`Open ${label}`}>
            <span className="icon"><Icon /></span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
