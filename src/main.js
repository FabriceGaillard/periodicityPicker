import { createApp } from 'vue'
import App from './App.vue'

import clickOutDirective from './directives/clickOutDirective'

import './assets/scss/index.scss'

const app = createApp(App).directive('click-out', clickOutDirective).mount('#app')
