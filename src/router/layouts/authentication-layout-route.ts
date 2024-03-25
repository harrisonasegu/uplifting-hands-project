import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import authenticationRouteChildren from '../children/authentication'

const AuthenticationLayoutRoutes = {
    path: '/',
    name: 'authentication layout',
    component: AuthenticationLayout,
    children: authenticationRouteChildren
}

export default AuthenticationLayoutRoutes