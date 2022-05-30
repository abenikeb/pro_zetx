export default function ({ store, redirect, route }) {
    const isLoggedIn = store.state.auth.isLoggedIn

    if (isLoggedIn && !['/login', '/signup'].includes(route.path)) {
        const location = store.state.auth.userData.location
        if (location === '' && route.path !== '/profile/location')
            return redirect('/profile/location')
        else if (location !== '' && route.path === '/profile/location')
            return redirect('/dashboard')
        console.log('location', location);
    }
}
