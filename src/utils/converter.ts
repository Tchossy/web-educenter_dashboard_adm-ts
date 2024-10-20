export const converter = {
  stringToNumber: (value: string): number => {
    const result = Number(value)
    if (isNaN(result)) {
      throw new Error('Invalid string format for number conversion')
    }
    return result
  },

  numberToString: (value: number): string => {
    return value.toString()
  }
}
