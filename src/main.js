import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import routers from './routers'
import moment from 'moment'

import './index.css'

import VueGoodTablePlugin from 'vue-good-table-next';
// import the styles
import 'vue-good-table-next/dist/vue-good-table-next.css'


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const vueApp = createApp(App);
vueApp.config.devtools = true;
vueApp.use(routers)
    .use(moment)
    .use(VueSweetalert2)
    .use(VueAxios, axios)
    .use(VueGoodTablePlugin)
    .mount('#app')