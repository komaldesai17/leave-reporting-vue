import Router from 'vue-router';
import AppLogin from '@/components/login'
import HolidayView from '@/components/holidayView'
import LeaveDashboard from '@/components/dashboard'
import LeaveStatus from '@/components/LeaveStatus'
import ApplyLeave from '@/components/applyLeave'
import PageNotFound from '@/components/PageNotFound';
import AppRegister from '@/components/registerPage'
import AppHome from '@/components/home'

import store from '@/store';

const meta = {
    authorize: []
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'Login',
            path: '/',
            component: AppLogin
        },
        {
            name: 'register',
            path: '/register',
            component: AppRegister,
        },
        {
            name: 'Holiday',
            path: '/holiday',
            component: HolidayView,
            meta
        },
        {
            name: 'Home',
            path: '/home',
            component: AppHome,
            meta
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: LeaveDashboard,
            meta
        },
        {
            name: 'status',
            path: '/status',
            component: LeaveStatus,
            meta
        },
        {
            name: 'Leave',
            path: '/leave',
            component: ApplyLeave,
            meta
        },
        {
            name: 'page-not-found',
            path: '*',
            component: PageNotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.authorize && !store.getters.isAuthenticated) {
        next({
            name: 'Login'
        });
    }
    else {
        next();
    }
})

export default router;