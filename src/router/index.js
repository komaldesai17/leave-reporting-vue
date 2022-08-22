import Router from 'vue-router';
import AppLogin from '@/components/login'
import HolidayView from '@/components/holidayView'
import LeaveDashboard from '@/components/dashboard'
import ApplyLeave from '@/components/applyLeave'


const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'Login',
            path: '/',
            component:AppLogin
        },
        {
            name: 'Holiday',
            path: '/holiday',
            component:HolidayView
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
            component:LeaveDashboard
        },
        {
            name: 'apply',
            path: '/apply',
            component:ApplyLeave
        }
        
    ]
})

export default router;