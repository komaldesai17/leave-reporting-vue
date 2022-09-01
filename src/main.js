import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import 'awesome-notifications/dist/style.css'
import 'awesome-notifications/dist/index.var'
import 'awesome-notifications/dist/modern.var'


import Vuelidate from 'vuelidate';


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
Vue.use(VueToast)
Vue.use( Vuelidate );



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
