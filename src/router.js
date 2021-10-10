import { createRouter, createWebHistory } from "vue-router"
import Dashboard from '@/components/Dashboard'
import News from '@/components/News'

const routeInfos = [{
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
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: routeInfos
})


export default router;