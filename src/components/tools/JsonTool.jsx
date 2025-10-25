import React, { useMemo, useState } from 'react'
import { IconCode, IconCheck, IconSwap, IconTrash, IconLink, IconHome } from '../icons.jsx'

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

  // Load input from URL if provided
  React.useEffect(() => {
    const v = query.get('v')
    if (v) setInput((() => { try { return decodeURIComponent(escape(atob(v))) } catch { return '' } })())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    // include input as base64
    try { url.searchParams.set('v', btoa(unescape(encodeURIComponent(input)))) } catch {}
    await navigator.clipboard.writeText(url.toString())
  }

  function clearAll() {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <div className="card-actions-top">
        <a className="btn icon-only" href={window.location.pathname} aria-label="All Tools">
          <span className="icon"><IconHome/></span>
        </a>
      </div>
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
        <button className="btn mellange block" onClick={act}>
          <span className="icon">{mode === 'validate' ? <IconCheck/> : <IconCode/>}</span>
          <span>{modeLabel}</span>
        </button>
        <button className="btn block" onClick={() => onModeChange(mode === 'validate' ? 'format' : 'validate')}>
          <span className="icon"><IconSwap/></span>
          <span>Switch to {mode === 'validate' ? 'Format' : 'Validate'}</span>
        </button>
        <button className="btn block" onClick={clearAll}>
          <span className="icon"><IconTrash/></span>
          <span>Clear</span>
        </button>
        <button className="btn block" onClick={copyLink}>
          <span className="icon"><IconLink/></span>
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  )
}
