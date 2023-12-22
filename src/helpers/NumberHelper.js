export default class NumberHelper {
  static isBetween(value, range) {
    const min = Math.min(range)
    const max = Math.max(range)
    return value >= min && value <= max
  }
}
