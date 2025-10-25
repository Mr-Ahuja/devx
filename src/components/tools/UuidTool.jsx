import React, { useEffect, useState } from 'react'

export function UuidTool() {
  const [uuids, setUuids] = useState([])

  useEffect(() => { generate() }, [])

  function generate(count = 1) {
    const list = Array.from({ length: count }, () => (self.crypto || window.crypto).randomUUID())
    setUuids(prev => [...list, ...prev].slice(0, 20))
  }

  async function copyFirst() {
    if (uuids[0]) await navigator.clipboard.writeText(uuids[0])
  }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <h2>UUID Generator</h2>
      <div className="cta" style={{ justifyContent: 'flex-start' }}>
        <button className="btn mellange" onClick={() => generate(1)}>Generate</button>
        <button className="btn" onClick={() => generate(5)}>Generate 5</button>
        <button className="btn" onClick={copyFirst} disabled={!uuids[0]}>Copy First</button>
        <a className="btn" href={window.location.pathname}>All Tools</a>
      </div>
      <div className="panel glass" style={{ marginTop: 16, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: 14 }}>
        {uuids.length === 0 ? 'Click Generate to create a UUID' : (
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {uuids.map((id, i) => (<li key={i} style={{ margin: '6px 0' }}>{id}</li>))}
          </ul>
        )}
      </div>
    </div>
  )
}

