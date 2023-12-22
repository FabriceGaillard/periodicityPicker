export default class ObjectHelper {
  /**
   *
   * @param {object} obj
   * @param {string[]} fields
   * @returns {object}
   */
  static omit(obj, props) {
    const newObj = {}
    Object.keys(obj).forEach((key) => {
      if (!props.includes(key)) {
        newObj[key] = obj[key]
      }
    })
    return newObj
  }

  /**
   *
   * @param {object} obj
   * @param {string[]} fields
   * @returns {object}
   */
  static pick(obj, props) {
    const newObj = {}
    props.forEach((prop) => (newObj[prop] = obj[prop]))
    return newObj
  }
}
