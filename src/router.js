import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lobby from './views/Lobby';
import Calendario from './views/calendario'
import {auth} from './auxJS/auxFunctions';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/lobby',
            name: 'lobby',
            component: Lobby,
            beforeEnter: (to, from, next) => {
                let user = auth();
                if (user === "user" || user === "admin") {
                    return next();
                } else {
                    return next('/');
                }
            }
        },
        {
            path: '/calendario',
            name: 'calendario',
            component: Calendario
        },
    ]
})
