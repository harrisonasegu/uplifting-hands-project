const dashboardRouteChildren = [
  {
    path: '/student-portal',
    name: 'student portal',
    component: () => import('@/views/student-portal/StudentPortalHomeView.vue'),
    meta: {
      title: 'Student Portal',
      authorizedUsers: [2]
    }
  },
  {
    path: '/student-portal/student-application-history',
    name: 'student application history',
    component: () => import('@/views/student-portal/StudentApplicationHistoryView.vue'),
    meta: {
      title: 'Student Application History',
      authorizedUsers: [2]
    }
  }
]

export default dashboardRouteChildren
