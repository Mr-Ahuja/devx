import React, { useMemo } from 'react'
import { tools } from './registry.js'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

export function ToolRouter() {
  const query = useQuery()
  const toolKey = (query.get('tool') || '').toLowerCase()
  const ToolComp = useMemo(() => tools[toolKey]?.Component, [toolKey])

  if (!ToolComp) {
    return (
      <div className="card">
        <h2>Unknown Tool</h2>
        <p>We couldn't find a tool for <code>{toolKey || '(none)'}</code>.</p>
        <p>
          <a className="btn" href={window.location.pathname}>Back to home</a>
        </p>
      </div>
    )
  }

  return <ToolComp />
}

