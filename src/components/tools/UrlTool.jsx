import React, { useEffect, useMemo, useState } from 'react'
import { IconSwap, IconTrash, IconLink, IconHome, IconGlobe } from '../icons.jsx'

function useQuery() { return new URLSearchParams(window.location.search) }
function b64e(str) { return btoa(unescape(encodeURIComponent(str))) }
function b64d(str) { try { return decodeURIComponent(escape(atob(str))) } catch { return '' } }
function updateURL(params) {
  const url = new URL(window.location.href)
  for (const [k, v] of Object.entries(params)) {
    if (v == null) url.searchParams.delete(k)
    else url.searchParams.set(k, v)
  }
  history.replaceState(null, '', url)
}

export function UrlTool() {
  const query = useQuery()
  const initialMode = (query.get('mode') || 'encode').toLowerCase()
  const [mode, setMode] = useState(initialMode)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    const v = query.get('v')
    if (v) setInput(b64d(v))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modeLabel = useMemo(() => mode === 'decode' ? 'Decode' : 'Encode', [mode])

  function onModeChange(next) {
    setMode(next)
    updateURL({ tool: 'url', mode: next })
  }

  function run() {
    if (mode === 'decode') setOutput(decodeURIComponent(input))
    else setOutput(encodeURIComponent(input))
  }

  async function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set('tool', 'url')
    url.searchParams.set('mode', mode)
    url.searchParams.set('v', b64e(input))
    await navigator.clipboard.writeText(url.toString())
  }

  function clearAll() { setInput(''); setOutput('') }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <div className="card-actions-top">
        <a className="btn icon-only" href={window.location.pathname} aria-label="All Tools">
          <span className="icon"><IconHome/></span>
        </a>
      </div>
      <h2>URL — {modeLabel}</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='Text or URL' style={{ width: '100%', height: 160, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }} />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Output</label>
          <textarea value={output} readOnly placeholder='Output will appear here' style={{ width: '100%', height: 160, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }} />
        </div>
      </div>
      <div className="cta" style={{ justifyContent: 'flex-start' }}>
        <button className="btn mellange block" onClick={run}>
          <span className="icon"><IconGlobe/></span>
          <span>{modeLabel}</span>
        </button>
        <button className="btn block" onClick={() => onModeChange(mode === 'decode' ? 'encode' : 'decode')}>
          <span className="icon"><IconSwap/></span>
          <span>Switch to {mode === 'decode' ? 'Encode' : 'Decode'}</span>
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
