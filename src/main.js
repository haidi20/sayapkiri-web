import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import moment from 'moment'
import './index.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(VueSweetalert2)
    .use(moment)
    .mount('#app')