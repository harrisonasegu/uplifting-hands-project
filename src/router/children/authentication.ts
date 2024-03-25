const authenticationRouteChildren = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Login'
    }    
  },
  {
    path: '/forgot-password',
    name: 'forgot password',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: '/change-password',
    name: 'change password',
    component: () => import('@/views/ChangePasswordView.vue'),
    meta: {
      title: 'Change Password'
    }
  }
]

export default authenticationRouteChildren
