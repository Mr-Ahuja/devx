import React, { useEffect, useMemo, useState } from 'react'

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
        <button className="btn mellange" onClick={run}>{modeLabel}</button>
        <button className="btn" onClick={() => onModeChange(mode === 'decode' ? 'encode' : 'decode')}>
          Switch to {mode === 'decode' ? 'Encode' : 'Decode'}
        </button>
        <button className="btn" onClick={clearAll}>Clear</button>
        <button className="btn" onClick={copyLink}>Copy Link</button>
        <a className="btn" href={window.location.pathname}>All Tools</a>
      </div>
    </div>
  )
}

