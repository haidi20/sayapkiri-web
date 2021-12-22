import { createRouter, createWebHashHistory } from "vue-router"

import auth from './authMiddleware';

import User from '@/pages/User'
import News from '@/pages/News'
import Login from '@/pages/Login'
import Account from '@/pages/Account'
import LastData from '@/pages/LastData'
import NotFound from '@/pages/NotFound'
import Counting from '@/pages/Counting'
import Dashboard from '@/pages/Dashboard'
import RewardReport from '@/pages/RewardReport'
import AccountBalance from '@/pages/AccountBalance'
import TransactionDaily from '@/pages/TransactionDaily'
import TransactionDetail from '@/pages/TransactionDetail'

const routes = [{
        path: '/',
        redirect: { name: 'dashboard' }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/last-data',
        name: 'lastData',
        component: LastData
    },
    {
        path: '/transaction-daily',
        name: 'transactionDaily',
        component: TransactionDaily
    },
    {
        path: '/transaction-detail',
        name: 'transactionDetail',
        component: TransactionDetail
    },
    {
        path: '/reward-report',
        name: 'rewardReport',
        component: RewardReport,
    },
    {
        path: '/counting-balance-equity',
        name: 'contingBalanceEquity',
        component: Counting,
    },
    {
        path: '/news',
        name: 'news',
        component: News
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
        path: '/account-balance',
        name: 'accountBalance',
        component: AccountBalance,
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
    routes: routes
});

router.beforeEach(auth);

export default router;