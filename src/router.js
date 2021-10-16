import { createRouter, createWebHistory } from "vue-router"
import News from '@/components/News'
import Login from '@/components/_auth/Login'
import Dashboard from '@/components/Dashboard'
import NotFound from '@/components/NotFound'

const routes = [{
        path: '/',
        redirect: { name: 'login' }
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
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'notFound',
        component: NotFound,
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: routes
})


export default router;