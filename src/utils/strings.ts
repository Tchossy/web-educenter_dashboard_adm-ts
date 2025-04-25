export function checkPrefix(str: string, prefix: string): boolean {
  return str.startsWith(prefix)
}

export function convertToBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (normalized === 'true' || normalized === '1') return true
    if (normalized === 'false' || normalized === '0') return false
  }

  if (typeof value === 'number') {
    return value === 1
  }

  return false
}
