import { h } from 'vue'
import { RouterLink } from 'vue-router'

import {
    Home,
    UserSettings,
    Book,
    Report,
    Settings
} from '@vicons/carbon'

import { useRenderIcon } from '@/composables/renderIcon'

const superAdminDashboardNavMenu: any = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'dashboard'
                }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'dashboard',
        icon: useRenderIcon(Home)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'user management'
                }
            },
            { default: () => 'User Management' }
        ),
        key: 'user management',
        icon: useRenderIcon(UserSettings)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'reports'
                }
            },
            { default: () => 'Reports' }
        ),
        key: 'reports',
        icon: useRenderIcon(Report)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'settings'
                }
            },
            { default: () => 'Settings' }
        ),
        key: 'settings',
        icon: useRenderIcon(Settings)
    }
]

const reviewOfficerAdminDashboardNavMenu: any = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'dashboard'
                }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'dashboard',
        icon: useRenderIcon(Home)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'application management'
                }
            },
            { default: () => 'Application Management' }
        ),
        key: 'application management',
        icon: useRenderIcon(Book)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'reports'
                }
            },
            { default: () => 'Reports' }
        ),
        key: 'reports',
        icon: useRenderIcon(Report)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'settings'
                }
            },
            { default: () => 'Settings' }
        ),
        key: 'settings',
        icon: useRenderIcon(Settings)
    }
]

const approvalOfficerAdminDashboardNavMenu: any = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'dashboard'
                }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'dashboard',
        icon: useRenderIcon(Home)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'application management'
                }
            },
            { default: () => 'Application Management' }
        ),
        key: 'application management',
        icon: useRenderIcon(Book)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'reports'
                }
            },
            { default: () => 'Reports' }
        ),
        key: 'reports',
        icon: useRenderIcon(Report)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'settings'
                }
            },
            { default: () => 'Settings' }
        ),
        key: 'settings',
        icon: useRenderIcon(Settings)
    }
]

const disbursementOfficerAdminDashboardNavMenu: any = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'dashboard'
                }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'dashboard',
        icon: useRenderIcon(Home)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'application management'
                }
            },
            { default: () => 'Application Management' }
        ),
        key: 'application management',
        icon: useRenderIcon(Book)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'reports'
                }
            },
            { default: () => 'Reports' }
        ),
        key: 'reports',
        icon: useRenderIcon(Report)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'settings'
                }
            },
            { default: () => 'Settings' }
        ),
        key: 'settings',
        icon: useRenderIcon(Settings)
    }
]

const reportUserAdminDashboardNavMenu: any = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'dashboard'
                }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'dashboard',
        icon: useRenderIcon(Home)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'reports'
                }
            },
            { default: () => 'Reports' }
        ),
        key: 'reports',
        icon: useRenderIcon(Report)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'settings'
                }
            },
            { default: () => 'Settings' }
        ),
        key: 'settings',
        icon: useRenderIcon(Settings)
    }
]

export const userDashboardNavMenu: any = {
    1: superAdminDashboardNavMenu,
    3: reviewOfficerAdminDashboardNavMenu,
    4: approvalOfficerAdminDashboardNavMenu,
    5: disbursementOfficerAdminDashboardNavMenu,
    6: reportUserAdminDashboardNavMenu
}
