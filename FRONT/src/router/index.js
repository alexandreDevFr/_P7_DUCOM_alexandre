import { createRouter, createWebHistory} from 'vue-router';
import Dashboard from '@/views/DashBoard.vue';
import Connexion from '@/views/Connexion.vue';
import Inscription from '@/views/Inscription.vue';
import store from '@/store/index.js'
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeconstants.js'

const routes = [
    { name: 'DashBoard', path: '/', component: Dashboard,},
    { name: 'Connexion', path: '/Connexion', component: Connexion,},
    { name: 'Inscription', path: '/Inscription', component: Inscription,},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // if(
    //     to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    // ){
    //     next('/connexion');
    // } else if (
    //     !to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    // ){
    //     next('/');
    // } else{
    //     next();
    // }

    if(to.path === '/' && localStorage.getItem('token') === null) {
        router.push('/Connexion')
    } else if (
        (
            to.path === '/Inscription' ||
            to.path === '/Connexion'
        ) &&
        localStorage.getItem('token') !== null
    ) {
        // next({ name: 'Dashboard' })
        router.push('/')
    }

    next();
});

export default router;