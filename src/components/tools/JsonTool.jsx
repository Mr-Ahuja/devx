import React, { useMemo, useState } from 'react'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

function updateURL(params) {
  const url = new URL(window.location.href)
  for (const [k, v] of Object.entries(params)) {
    if (v == null) url.searchParams.delete(k)
    else url.searchParams.set(k, v)
  }
  history.replaceState(null, '', url)
}

export function JsonTool() {
  const query = useQuery()
  const initialMode = (query.get('mode') || 'format').toLowerCase()
  const [mode, setMode] = useState(initialMode)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const modeLabel = useMemo(() => mode === 'validate' ? 'Validate' : 'Format', [mode])

  function onModeChange(next) {
    setMode(next)
    updateURL({ tool: 'json', mode: next })
  }

  function formatJSON() {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
    } catch (e) {
      setError(String(e.message || e))
      setOutput('')
    }
  }

  function validateJSON() {
    setError('')
    try {
      JSON.parse(input)
      setOutput('Valid JSON ✅')
    } catch (e) {
      setOutput('Invalid JSON ❌')
      setError(String(e.message || e))
    }
  }

  function act() {
    mode === 'validate' ? validateJSON() : formatJSON()
  }

  async function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set('tool', 'json')
    url.searchParams.set('mode', mode)
    await navigator.clipboard.writeText(url.toString())
  }

  function clearAll() {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <h2>JSON — {modeLabel}</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Input</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            style={{ width: '100%', height: 200, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here"
            style={{ width: '100%', height: 200, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }}
          />
        </div>
      </div>

      {error && (
        <div className="panel glass" style={{ color: '#ffd1d1', borderColor: '#ff5454', marginTop: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="cta" style={{ justifyContent: 'flex-start' }}>
        <button className="btn mellange" onClick={act}>{modeLabel}</button>
        <button className="btn" onClick={() => onModeChange(mode === 'validate' ? 'format' : 'validate')}>
          Switch to {mode === 'validate' ? 'Format' : 'Validate'}
        </button>
        <button className="btn" onClick={clearAll}>Clear</button>
        <button className="btn" onClick={copyLink}>Copy Link</button>
        <a className="btn" href={window.location.pathname}>All Tools</a>
      </div>
    </div>
  )
}

