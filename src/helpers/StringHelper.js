export default class StringHelper {
  static Capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  }
}
