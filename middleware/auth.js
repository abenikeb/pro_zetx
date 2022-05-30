export default function ({ store, redirect, route }) {
  const isLoggedIn = store.state.auth.isLoggedIn

  // store.dispatch('business/updateBusinessAuctionStatus')

  if (!isLoggedIn && route.path !== '/login') {
    return redirect('/login')
  }
}
