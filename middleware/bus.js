export default function ({ store, redirect}) {
    const roles = store.state.auth.userData.roles
  
    if (roles.includes('business')) {
    //   alert('you don\'t have a admin permission')  
      redirect('/business/dashboard')
    }
    
  }
  