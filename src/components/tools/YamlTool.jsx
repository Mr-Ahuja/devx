import React, { useEffect, useMemo, useState } from 'react'
import YAML from 'yaml'

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

export function YamlTool() {
  const query = useQuery()
  const initialMode = (query.get('mode') || 'yaml2json').toLowerCase()
  const [mode, setMode] = useState(initialMode)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const v = query.get('v')
    if (v) setInput(b64d(v))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modeLabel = useMemo(() => mode === 'json2yaml' ? 'JSON → YAML' : 'YAML → JSON', [mode])

  function onModeChange(next) {
    setMode(next)
    updateURL({ tool: 'yaml', mode: next })
  }

  function convert() {
    setError('')
    try {
      if (mode === 'yaml2json') {
        const doc = YAML.parse(input)
        setOutput(JSON.stringify(doc, null, 2))
      } else {
        const obj = JSON.parse(input)
        setOutput(YAML.stringify(obj))
      }
    } catch (e) {
      setError(String(e.message || e))
      setOutput('')
    }
  }

  async function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set('tool', 'yaml')
    url.searchParams.set('mode', mode)
    url.searchParams.set('v', b64e(input))
    await navigator.clipboard.writeText(url.toString())
  }

  function clearAll() { setInput(''); setOutput(''); setError('') }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <h2>YAML ⇄ JSON — {modeLabel}</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='key: value' style={{ width: '100%', height: 220, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }} />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Output</label>
          <textarea value={output} readOnly placeholder='Output will appear here' style={{ width: '100%', height: 220, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }} />
        </div>
      </div>

      {error && (
        <div className="panel glass" style={{ color: '#ffd1d1', borderColor: '#ff5454', marginTop: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="cta" style={{ justifyContent: 'flex-start' }}>
        <button className="btn mellange" onClick={convert}>Convert</button>
        <button className="btn" onClick={() => onModeChange(mode === 'yaml2json' ? 'json2yaml' : 'yaml2json')}>
          Switch to {mode === 'yaml2json' ? 'JSON → YAML' : 'YAML → JSON'}
        </button>
        <button className="btn" onClick={clearAll}>Clear</button>
        <button className="btn" onClick={copyLink}>Copy Link</button>
        <a className="btn" href={window.location.pathname}>All Tools</a>
      </div>
    </div>
  )
}

