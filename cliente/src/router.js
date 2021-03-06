import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lobby from './views/Lobby';
import Calendario from './views/calendario'
import Admin from './views/Admin'
import Ajustes from './views/Ajustes'
import Project from './views/Project'
import Estadistica from './views/Estadistica'
import conversacion from './views/conversacion'
import Webmap from './views/Webmap'
import infoweb from './views/infoweb'
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
            component: Calendario,
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
            //Solo para ADMIN
            path: '/Admin',
            name: 'Admin',
            component: Admin,
            beforeEnter: (to, from, next) => {
                let user = auth();
                if (user === "admin") {
                    return next();
                } else {
                    return next('/Lobby');
                }
            }
        },
        {
            path: '/Ajustes',
            name: 'Ajustes',
            component: Ajustes,
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
            path: '/Project/:id',
            name: 'Project',
            component: Project,
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
            path: '/Estadistica/:id',
            name: 'Estadistica',
            component: Estadistica,
            beforeEnter: (to, from, next) => {
                let user = auth();
                if (user === "admin") {
                    return next();
                } else {
                    return next('/');
                }
            }
        },
        {
            path: '/conversacion',
            name: 'conversacion',
            component: conversacion,
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
            path: '/Webmap',
            name: 'Webmap',
            component: Webmap
        },
        {
            path: '/infoweb',
            name: 'infoweb',
            component: infoweb
        },
        {
            path: '/*',
            name: 'name',
            component: Lobby
        },
    ]
})
