import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { openLayoutNavMenuStyles } from './config/stylesConfig'

export const openLayoutHelpCenterNavDropdown: any = [
    {
        label: () => h(
            RouterLink,
            {
                style: openLayoutNavMenuStyles,
                to: {
                    name: 'customer service'
                }
            },
            { default: () => 'Customer Service' }
        ),
        key: 'customer service'
    },
    {
        label: () => h(
            RouterLink,
            {
                style: openLayoutNavMenuStyles,
                to: {
                    name: 'application help'
                }
            },
            { default: () => 'Application Help' }
        ),
        key: 'application help'
    }
]

export const openLayoutNavMenu: any = [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'home'
                }
            },
            { default: () => 'Home' }
        ),
        key: 'home'
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'about us'
                }
            },
            { default: () => 'About Us' }
        ),
        key: 'about us'
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'student'
                }
            },
            { default: () => 'Student' }
        ),
        key: 'student'
    },
    {
        label: 'Help Center',
        key: 'help center',
        children: [
            {
                label: () => h(
                    RouterLink,
                    {
                        to: {
                            name: 'customer service'
                        }
                    },
                    { default: () => 'Customer Service' }
                ),
                key: 'customer service'
            },
            {
                label: () => h(
                    RouterLink,
                    {
                        to: {
                            name: 'application help'
                        }
                    },
                    { default: () => 'Application Help' }
                ),
                key: 'application help'
            }
        ]
    },
    // {
    //     label: () => h(
    //         RouterLink,
    //         {
    //             to: {
    //                 name: 'donate'
    //             }
    //         },
    //         { default: () => 'Donate' }
    //     ),
    //     key: 'donate'
    // },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'apply'
                }
            },
            { default: () => 'Apply' }
        ),
        key: 'apply'
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'sign in'
                }
            },
            { default: () => 'Sign In' }
        ),
        key: 'sign in'
    }
]


// check device is extra small 
if (window.innerWidth >= 576) {
    // remove (apply, login) routes from menu items from "openLayoutNavMenu"
    openLayoutNavMenu.splice(4)
}
