import Vue from 'vue'

import Preview from '~/components/Preview.vue'

Vue.component(Preview.name, Preview)
Vue.filter('date', val => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const date = new Date(val)
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
})
