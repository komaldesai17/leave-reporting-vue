import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from '@/store'


import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from "bootstrap-vue"
import "bootstrap-vue/dist/bootstrap-vue.css"


//import { NavbarPlugin } from 'bootstrap-vue'

import '@fullcalendar/core'
import '@fullcalendar/vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../src/css/util.css'

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VueCookies, { 
})



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
