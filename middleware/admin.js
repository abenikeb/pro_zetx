export default function ({ store, redirect}) {
    const roles = store.state.auth.userData.roles
  
    if (!roles.includes('admin')) {
      alert('you don\'t have a admin permission')  
      redirect('/')
    }
    
  }
  