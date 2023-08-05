import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function AuthRoute() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  if(user===null){
    router.push('/login')
  } else{
    return user
  }
  
}

export default AuthRoute;