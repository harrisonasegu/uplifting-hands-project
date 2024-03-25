const dashboardRouteChildren = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
      title: 'Dashboard',
      authorizedUsers: [1, 3, 4, 5, 6]
    }
  },
  {
    path: '/user-management',
    name: 'user management',
    component: () => import('@/views/dashboard/UserManagementView.vue'),
    meta: {
      title: 'User Management',
      authorizedUsers: [1]
    }
  },
  {
    path: '/application-management',
    name: 'application management',
    component: () => import('@/views/dashboard/ApplicationManagementView.vue'),
    meta: {
      title: 'Application Management',
      authorizedUsers: [3, 4, 5, 6]
    }
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/dashboard/ReportsView.vue'),
    meta: {
      title: 'Reports',
      authorizedUsers: [1, 3, 4, 5, 6]
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/dashboard/SettingsView.vue'),
    meta: {
      title: 'Settings',
      authorizedUsers: [1, 3, 4, 5, 6]
    }
  }
]

export default dashboardRouteChildren
