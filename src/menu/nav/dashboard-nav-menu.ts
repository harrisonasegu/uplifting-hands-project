import { useAuthenticationStore } from '@/stores/modules/authentication'
import { userDashboardNavMenu } from './user-nav-menu-config'

const userStore = useAuthenticationStore()
const userRoleId = userStore.getUser.roleId

export const dashboardNavMenu = userDashboardNavMenu[userRoleId] // menu dispalyed based on the current user's ID
