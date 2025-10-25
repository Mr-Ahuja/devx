import React, { useEffect, useMemo, useState } from 'react'
import { IconCompare, IconSwap, IconTrash, IconLink, IconHome } from '../icons.jsx'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

function b64encode(str) {
  return btoa(unescape(encodeURIComponent(str)))
}
function b64decode(str) {
  try { return decodeURIComponent(escape(atob(str))) } catch { return '' }
}

function updateURL(params) {
  const url = new URL(window.location.href)
  for (const [k, v] of Object.entries(params)) {
    if (v == null) url.searchParams.delete(k)
    else url.searchParams.set(k, v)
  }
  history.replaceState(null, '', url)
}

// Simple line-based diff using LCS
function diffLines(a, b) {
  const A = a.split('\n')
  const B = b.split('\n')
  const n = A.length, m = B.length
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const ops = []
  let i = 0, j = 0
  while (i < n && j < m) {
    if (A[i] === B[j]) { ops.push({ type: 'eq', a: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push({ type: 'del', a: A[i] }); i++; }
    else { ops.push({ type: 'ins', b: B[j] }); j++; }
  }
  while (i < n) { ops.push({ type: 'del', a: A[i++] }) }
  while (j < m) { ops.push({ type: 'ins', b: B[j++] }) }
  return ops
}

export function DiffTool() {
  const query = useQuery()
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [ops, setOps] = useState([])

  useEffect(() => {
    const a = query.get('a')
    const b = query.get('b')
    if (a || b) {
      setLeft(a ? b64decode(a) : '')
      setRight(b ? b64decode(b) : '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function compare() {
    setOps(diffLines(left, right))
  }

  function swap() { setLeft(right); setRight(left); setOps([]) }
  function clearAll() { setLeft(''); setRight(''); setOps([]) }

  async function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set('tool', 'diff')
    url.searchParams.set('a', b64encode(left))
    url.searchParams.set('b', b64encode(right))
    await navigator.clipboard.writeText(url.toString())
  }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <h2>Diff Checker</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">A</label>
          <textarea
            value={left}
            onChange={e => setLeft(e.target.value)}
            placeholder='Left text...'
            style={{ width: '100%', height: 220, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <label className="muted">B</label>
          <textarea
            value={right}
            onChange={e => setRight(e.target.value)}
            placeholder='Right text...'
            style={{ width: '100%', height: 220, padding: 12, borderRadius: 12, background: '#0f151d', color: 'var(--fg)', border: '1px solid #223042' }}
          />
        </div>
      </div>

      <div className="cta" style={{ justifyContent: 'flex-start' }}>
        <button className="btn mellange block" onClick={compare}>
          <span className="icon"><IconCompare/></span>
          <span>Compare</span>
        </button>
        <button className="btn block" onClick={swap}>
          <span className="icon"><IconSwap/></span>
          <span>Swap</span>
        </button>
        <button className="btn block" onClick={clearAll}>
          <span className="icon"><IconTrash/></span>
          <span>Clear</span>
        </button>
        <button className="btn block" onClick={copyLink}>
          <span className="icon"><IconLink/></span>
          <span>Copy Link</span>
        </button>
        <a className="btn block" href={window.location.pathname}>
          <span className="icon"><IconHome/></span>
          <span>All Tools</span>
        </a>
      </div>

      {ops.length > 0 && (
        <div className="panel glass" style={{ marginTop: 16 }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: 14 }}>
            {ops.map((op, idx) => {
              if (op.type === 'eq') return <div key={idx} style={{ whiteSpace: 'pre-wrap' }}>  {op.a}</div>
              if (op.type === 'del') return <div key={idx} style={{ background: 'rgba(255,0,0,0.08)', borderLeft: '3px solid #ff5a5a', whiteSpace: 'pre-wrap' }}>- {op.a}</div>
              if (op.type === 'ins') return <div key={idx} style={{ background: 'rgba(0,200,0,0.08)', borderLeft: '3px solid #34d058', whiteSpace: 'pre-wrap' }}>+ {op.b}</div>
              return null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
