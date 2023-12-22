export default class ArrayHelper {
  static padEnd(array, minLength, fillValue = undefined) {
    return Object.assign(new Array(minLength).fill(fillValue), array)
  }

  static padStart(array, minLength, fillValue = undefined) {
    return new Array(minLength - array.length).fill(fillValue).concat(array)
  }

  static fromRange(r, step = 1) {
    return Array.from(
      { length: Math.abs(r[1] - r[0]) / step },
      (_, i) => r[0] + i * step * ((r[1] - r[0]) / Math.abs(r[1] - r[0])) // (r[1] - r[0]) / Math.abs(r[1] - r[0]) détermine le sens -1 ou 1
    ).concat(r[1])
  }
}
