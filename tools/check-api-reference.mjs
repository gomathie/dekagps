/** Verifies the committed API v2/v3 datasets and white-label invariants. */
import { readFileSync } from 'node:fs'
import path from 'node:path'

const datasets = [
  { file: 'v2.json', categories: 9, endpoints: 74 },
  { file: 'v3.json', categories: 15, endpoints: 96 }
]
const failures = []
const fail = (message) => failures.push(message)
const FORBIDDEN = /naviafri|pilot|<?server_address>?/i

function visitStrings(value, visit) {
  if (typeof value === 'string') visit(value)
  else if (Array.isArray(value)) value.forEach((child) => visitStrings(child, visit))
  else if (value && typeof value === 'object') Object.values(value).forEach((child) => visitStrings(child, visit))
}

for (const expected of datasets) {
  const file = path.resolve('src', 'api', 'data', expected.file)
  const data = JSON.parse(readFileSync(file, 'utf8'))
  const endpoints = data.flatMap((category) => category.endpoints || [])
  const ids = new Set()

  if (data.length !== expected.categories) {
    fail(`${expected.file}: expected ${expected.categories} categories, found ${data.length}`)
  }
  if (endpoints.length !== expected.endpoints) {
    fail(`${expected.file}: expected ${expected.endpoints} endpoints, found ${endpoints.length}`)
  }

  for (const endpoint of endpoints) {
    if (!endpoint.id || ids.has(endpoint.id)) fail(`${expected.file}: missing or duplicate id ${endpoint.id}`)
    ids.add(endpoint.id)
    if (!endpoint.title || !endpoint.method || !endpoint.url) fail(`${expected.file}/${endpoint.id}: incomplete endpoint`)
    if (!/^https:\/\/onegps\.africa(?:\/|$)/.test(endpoint.url)) {
      fail(`${expected.file}/${endpoint.id}: endpoint is not on onegps.africa (${endpoint.url})`)
    }
  }

  visitStrings(data, (value) => {
    const forbidden = value.match(FORBIDDEN)
    if (forbidden) fail(`${expected.file}: source-brand text remains (${forbidden[0]})`)
    for (const match of value.matchAll(/https?:\/\/([^\s/"'<>]+)/gi)) {
      if (match[1].toLowerCase() !== 'onegps.africa') {
        fail(`${expected.file}: non-OneGPS address remains (${match[0]})`)
      }
    }
  })

  console.log(`${expected.file}: ${data.length} categories, ${endpoints.length} endpoints`)
}

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`)
  failures.slice(0, 25).forEach((message) => console.error(`  - ${message}`))
  process.exitCode = 1
} else {
  console.log('\nAPI datasets and white-label rules are consistent')
}
