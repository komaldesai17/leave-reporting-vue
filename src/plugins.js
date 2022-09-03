import Vue from 'vue'

import VueCookies from 'vue-cookies';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


import Vuelidate from 'vuelidate';


import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from "bootstrap-vue"
import "bootstrap-vue/dist/bootstrap-vue.css"


import '@fullcalendar/core'
import '@fullcalendar/vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../src/css/util.css'

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VueToast, { position: 'top-right', duration: 3000 })
Vue.use(Vuelidate);
Vue.use(VueCookies)