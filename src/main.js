import { createApp } from 'vue'
import App from './App.vue'

//directives
import clickOutDirective from './directives/clickOutDirective'
import mousePressedDirective from './directives/mousePressedDirective'

//plugins
import i18n from './plugins/i18n'

import './assets/scss/index.scss'

createApp(App)
  .directive('click-out', clickOutDirective)
  .directive('mouse-pressed', mousePressedDirective)
  .use(i18n, {
    locale: process.env.VITE_DEFAULT_LOCALE,
    dictionnary: await import('./i18n/locales/en.json')
  })
  .mount('#app')
