import studentPortalRouteChildren from '../children/student-portal'

const StudentPortalLayoutRoute = {
    path: '/',
    name: 'student portal layout',
    component: () => import('@/layouts/StudentPortalLayout.vue'),
    children: studentPortalRouteChildren,
    meta: {
        requiresAuth: true
    }
}

export default StudentPortalLayoutRoute
