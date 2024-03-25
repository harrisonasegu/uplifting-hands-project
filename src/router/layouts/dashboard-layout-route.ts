import dashboardRouteChildren from '../children/dashboard'

const DashboardLayoutRoute = {
    path: '/',
    name: 'dashboard layout',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: dashboardRouteChildren,
    meta: {
        requiresAuth: true
    }
}

export default DashboardLayoutRoute
