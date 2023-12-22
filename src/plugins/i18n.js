export default {
  install(app, options) {
    app.provide('locale', process.env.VITE_DEFAULT_LOCALE)
    app.config.globalProperties.$t = (key) => {
      return key.split('.').reduce((obj, i) => obj[i], options)
    }
  }
}
