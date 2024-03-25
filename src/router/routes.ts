import GuestLayoutRoute from './layouts/guest-layout-route'
import DashboardLayoutRoute from './layouts/dashboard-layout-route'
import StudentPortalLayoutRoute from './layouts/student-portal-layout-route'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'page not found',
        component: () => import('@/views/404.vue')
    },
    GuestLayoutRoute,
    DashboardLayoutRoute,
    StudentPortalLayoutRoute
]

export default routes
