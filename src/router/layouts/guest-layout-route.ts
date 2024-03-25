import Guestlayout from '@/layouts/GuestLayout.vue'
import guestRouteChildren from '../children/guest'

const GuestLayoutRoutes = {
    path: '/',
    name: 'guest layout',
    component: Guestlayout,
    children: guestRouteChildren
}

export default GuestLayoutRoutes