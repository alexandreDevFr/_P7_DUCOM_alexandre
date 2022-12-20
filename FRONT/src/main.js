// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'

// import { createStore } from 'vuex'

// Axios.defaults.baseURL = "http://localhost:8000/api/";

import router from './router';

import store from './store'
// import Axios from 'axios';

createApp(App).use(store).use(router).mount('#app')
