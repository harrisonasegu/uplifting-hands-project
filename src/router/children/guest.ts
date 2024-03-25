const guestRouteChildren = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about-us',
    name: 'about us',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About Us'
    }    
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('@/views/StudentView.vue'),
    meta: {
      title: 'Student'
    }
  },
  {
    path: '/customer-service',
    name: 'customer service',
    component: () => import('@/views/CustomerServiceView.vue'),
    meta: {
      title: 'Customer Service'
    }
  },
  {
    path: '/application-help',
    name: 'application help',
    component: () => import('@/views/ApplicationHelpView.vue'),
    meta: {
      title: 'Application Help'
    }
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('@/views/ApplyView.vue'),
    meta: {
      title: 'Apply'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/sign-in',
    name: 'sign in',
    component: () => import('@/views/WelcomeView.vue'),
    meta: {
      title: 'Sign In'
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

export default guestRouteChildren
