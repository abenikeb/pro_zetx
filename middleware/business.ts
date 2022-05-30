import { Middleware } from '@nuxt/types'

const BusinessMiddleware: Middleware = async function ({
  store,
  redirect,
  $fire,
}) {
  const uid = $fire.auth.currentUser?.uid

  if (typeof uid === 'undefined') return redirect('/login')

  const isBusiness = store.state.auth.userData.roles.includes('business')
  const accountExists = !(
    await $fire.firestore
      .collection('business')
      .where('BusinessOwnerId', '==', uid)
      .limit(1)
      .get()
  ).empty

  // If user doesn't have a business profile setup
  if (!isBusiness || !accountExists) {
    return redirect('/business/setup')
  }
}

export default BusinessMiddleware
