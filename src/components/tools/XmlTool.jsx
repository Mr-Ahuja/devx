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

function prettyPrintXML(xml) {
  try {
    // Normalize spaces between tags for indentation pass
    const P = new DOMParser()
    const dom = P.parseFromString(xml, 'application/xml')
    const err = dom.getElementsByTagName('parsererror')[0]
    if (err) throw new Error(err.textContent || 'XML parse error')
  } catch (e) {
    // if invalid, still try best-effort pretty so user can see structure
  }
  let formatted = ''
  const reg = /(>)(<)(\/*)/g
  const xmlStr = xml.replace(/\r?\n/g, '').replace(reg, '$1\n$2$3')
  let pad = 0
  xmlStr.split('\n').forEach((node) => {
    if (node.match(/^\s*<\//)) pad = Math.max(pad - 1, 0)
    formatted += '  '.repeat(pad) + node + '\n'
    if (node.match(/^\s*<[^!?/][^>]*[^/]>/)) pad += 1
  })
  return formatted.trim()
}

export function XmlTool() {
  const query = useQuery()
  const initialMode = (query.get('mode') || 'format').toLowerCase()
  const [mode, setMode] = useState(initialMode)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const modeLabel = useMemo(() => mode === 'validate' ? 'Validate' : 'Format', [mode])

  function onModeChange(next) {
    setMode(next)
    updateURL({ tool: 'xml', mode: next })
  }

  function formatXML() {
    setError('')
    try {
      setOutput(prettyPrintXML(input))
    } catch (e) {
      setError(String(e.message || e))
      setOutput('')
    }
  }

  function validateXML() {
    setError('')
    const parser = new DOMParser()
    const dom = parser.parseFromString(input, 'application/xml')
    const err = dom.getElementsByTagName('parsererror')[0]
    if (err) {
      setOutput('Invalid XML ❌')
      setError(err.textContent || 'XML parse error')
    } else {
      setOutput('Valid XML ✅')
    }
  }

  function act() {
    mode === 'validate' ? validateXML() : formatXML()
  }

  async function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set('tool', 'xml')
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
      <h2>XML — {modeLabel}</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">Input</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='<root>value</root>'
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

