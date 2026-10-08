/**
 * Imports the structured API datasets from the standalone API documentor.
 *
 * Usage:
 *   node tools/import-api-reference.mjs "C:\\path\\to\\api-documentor"
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const sourceRoot = process.argv[2]
if (!sourceRoot) throw new Error('Pass the api-documentor project path')

const outputDir = path.resolve('src/api/data')
const datasets = [
  ['endpoints.json', 'v2.json'],
  ['endpoints-v3.json', 'v3.json']
]

const SOURCE_BRAND = /naviafri|pilot/gi
const FORBIDDEN = /naviafri|pilot|<?server_address>?/i
const ABSOLUTE_HOST = /https?:\/\/(?:<server_address>|[a-z0-9.-]+)(?=[/:?]|$)/gi

function whiteLabelString(value) {
  return value
    .replace(ABSOLUTE_HOST, 'https://onegps.africa')
    .replace(/(?:gps\.)?naviafri\.com/gi, 'onegps.africa')
    .replace(/<?server_address>?/gi, 'onegps.africa')
    .replace(SOURCE_BRAND, 'OneGPS')
}

function whiteLabel(value) {
  if (typeof value === 'string') return whiteLabelString(value)
  if (Array.isArray(value)) return value.map(whiteLabel)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, whiteLabel(child)]))
  }
  return value
}

function visitStrings(value, visit) {
  if (typeof value === 'string') visit(value)
  else if (Array.isArray(value)) value.forEach((child) => visitStrings(child, visit))
  else if (value && typeof value === 'object') Object.values(value).forEach((child) => visitStrings(child, visit))
}

mkdirSync(outputDir, { recursive: true })

for (const [sourceName, outputName] of datasets) {
  const sourceFile = path.join(path.resolve(sourceRoot), 'src', 'data', sourceName)
  const data = whiteLabel(JSON.parse(readFileSync(sourceFile, 'utf8')))
  const endpoints = data.flatMap((category) => category.endpoints)
  const ids = new Set()

  for (const endpoint of endpoints) {
    const canonicalUrl = endpoint.url?.match(/https:\/\/onegps\.africa[^\s]*/i)?.[0]
    if (canonicalUrl) endpoint.url = canonicalUrl
    if (!endpoint.id || ids.has(endpoint.id)) throw new Error(`${sourceName}: missing or duplicate endpoint id ${endpoint.id}`)
    ids.add(endpoint.id)
  }

  visitStrings(data, (value) => {
    const forbidden = value.match(FORBIDDEN)
    if (forbidden) throw new Error(`${sourceName}: source-brand text remains (${forbidden[0]})`)

    for (const match of value.matchAll(/https?:\/\/([^\s/"'<>]+)/gi)) {
      if (match[1].toLowerCase() !== 'onegps.africa') {
        throw new Error(`${sourceName}: non-OneGPS address remains (${match[0]})`)
      }
    }
  })

  writeFileSync(path.join(outputDir, outputName), `${JSON.stringify(data, null, 2)}\n`)
  console.log(`${outputName}: ${data.length} categories, ${endpoints.length} endpoints`)
}
