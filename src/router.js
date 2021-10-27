import { createRouter, createWebHashHistory } from "vue-router"

import User from '@/components/User'
import News from '@/components/News'
import Login from '@/components/Login'
import Account from '@/components/Account'
import NotFound from '@/components/NotFound'
import Dashboard from '@/components/Dashboard'
import UltraProfit from '@/components/UltraProfit'

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
        path: '/user',
        name: 'user',
        component: User,
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
    },
    {
        path: '/ultra-profit',
        name: 'ultraProfit',
        component: UltraProfit,
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'notFound',
        component: NotFound,
    }
];

const router = createRouter({
    // mode: 'history',
    mode: 'hash',
    history: createWebHashHistory(),
    scrollBehavior: () => ({
        y: 0
    }),
    routes: routes
});


export default router;