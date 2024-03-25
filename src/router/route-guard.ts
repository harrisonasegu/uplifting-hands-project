const user = () => localStorage.getItem('@')
    ? JSON.parse(localStorage.getItem('@') as string)
    : null

const token = user() ? user()['#####'] : null
const user_data = user() ? user()['####'] : null

const authenticateUser = (to: any, from: any, next: any) => {
    // Route authentication required
    if (to.meta?.requiresAuth) {
        // This checks user for token
        if (token) {
            // This checks user for route authorization
            if (to.meta.authorizedUsers.includes(user_data?.roleId)) {
                next()
            }

            // User is unauthorized to enter/view a page, hence redirected to 'PAGE NOT FOUND'
            if (!to.meta.authorizedUsers.includes(user_data?.roleId)) {
                next('/page-not-found')
            }
        } else {
            // route user to login page
            next({
                name: 'login'
            })
        }
    } else {
        // unprotected routes, hence can be viewed by any one
        next()
    }
}

export default authenticateUser
