import { createRouter, createWebHistory } from "vue-router"
import Dashboard from '@/components/Dashboard'
import News from '@/components/News'
import Login from '@/components/_auth/Login'

const routes = [{
        path: '/',
        redirect: { name: 'dashboard' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/news',
        name: 'news',
        component: News
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: routes
})


export default router;