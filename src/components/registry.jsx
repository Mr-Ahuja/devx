import { JsonTool } from './tools/JsonTool.jsx'
import { XmlTool } from './tools/XmlTool.jsx'
import { DiffTool } from './tools/DiffTool.jsx'
import { YamlTool } from './tools/YamlTool.jsx'
import { UrlTool } from './tools/UrlTool.jsx'
import { Base64Tool } from './tools/Base64Tool.jsx'
import { UuidTool } from './tools/UuidTool.jsx'

// Minimal inline SVG icons
const JsonIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7 4h3v2H9v2H7zm-2 6h2v4H5zm2 6h2v2h1v2H7zm8-12h3v2h-1v2h-2zm2 6h2v4h-2zm-2 6h2v2h1v2h-3z"/></svg>
)
const XmlIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M8.7 6.3 4 11l4.7 4.7 1.4-1.4L6.8 11l3.3-3.3-1.4-1.4zm6.6 0-1.4 1.4L17.2 11l-3.3 3.3 1.4 1.4L20 11l-4.7-4.7z"/></svg>
)
const DiffIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M4 4h8v2H4zm0 4h8v2H4zm0 8h8v2H4zm0-4h8v2H4zm10-4h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/></svg>
)

export const tools = {
  json: { label: 'JSON', Component: JsonTool, Icon: JsonIcon, phase: 1 },
  xml: { label: 'XML', Component: XmlTool, Icon: XmlIcon, phase: 1 },
  diff: { label: 'Diff Checker', Component: DiffTool, Icon: DiffIcon, phase: 1 },
  // Phase 2 tools
  yaml: { label: 'YAML ⇄ JSON', Component: YamlTool, Icon: JsonIcon, phase: 2 },
  url: { label: 'URL Encode/Decode', Component: UrlTool, Icon: DiffIcon, phase: 2 },
  b64: { label: 'Base64 Encode/Decode', Component: Base64Tool, Icon: DiffIcon, phase: 2 },
  uuid: { label: 'UUID Generator', Component: UuidTool, Icon: DiffIcon, phase: 2 },
}
