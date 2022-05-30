export default function ({ store, redirect }) {
  const isLoggedIn = store.state.auth.isLoggedIn
  const userData = store.state.auth.userData

  if (isLoggedIn && userData) {
    console.log('called');
    console.log('userData', userData);
    return redirect('/dashboard')
  }
}
