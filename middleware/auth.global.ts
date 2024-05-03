import type { User } from "~/model/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const {value: token} = useCookie('accessToken'); 
  const isAuthenticated = useState('isAuthenticated', () => false)
  const user = useState<User>('user');
  if(token){
    try{
      const authUser = await $fetch<User>('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        }, 
      });
      user.value = authUser;      
      isAuthenticated.value = true;
    } catch (error) {
      isAuthenticated.value = false;
    }
  }else{
    isAuthenticated.value = false;
  }

  if(isAuthenticated.value && to?.name !== 'index'){
    return navigateTo('/');
  }
  if(!isAuthenticated.value && to?.name === 'index'){    
    abortNavigation();
    return navigateTo('/login');
  }
  
})
