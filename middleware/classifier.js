export default function ({ store, redirect}) {
    const roles = store.state.auth.userData.roles
  
    if (!roles.includes('classifier')) {
      alert('you don\'t have a clasifier permission')  
      redirect('/')
    }
    
  }
  