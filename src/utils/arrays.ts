export function sortArrayBy(array: any[], asc: boolean, prop?: string): any[] {
  const sortedArray = array.sort((a: any, b: any) => {
    const valueA = getValue(a, prop)
    const valueB = getValue(b, prop)

    if (valueA < valueB) {
      return asc ? -1 : 1
    }
    if (valueA > valueB) {
      return asc ? 1 : -1
    }
    return 0
  })

  return sortedArray
}

function getValue(obj: any, prop?: string): any {
  if (prop) {
    const value = obj[prop]
    switch (typeof value) {
      case 'string':
        return value.toLowerCase()
      case 'number':
        return value
      case 'boolean':
        return value ? 1 : 0
      case 'object':
        if (value instanceof Date) {
          return value
        }
        break
      default:
        return value
    }
  }

  return obj.first_name.toString().toLowerCase() // Caso prop não seja fornecido, usamos a propriedade 'first_name' como padrão
}
