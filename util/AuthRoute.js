import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
// import {useState} from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';


function AuthRoute() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  
  
  if(user===null){
    router.push('/login')
  } else{
    return user
  }
  
}

// function AuthRoute({ component: Component, ...rest }) {
//   const router = useRouter();
//   const { user } = useContext(AuthContext);
//   const [registerRoute, toRegister] = useState(false);

//   if(user===null && !registerRoute){
//     router.push('/login');
//     return <Component {...rest}/>
//   } else if(user===null && registerRoute){
//     router.push('/register');
//     return <Component {...rest}/>
//   } else if (user===null){
//     return (
//       <Box sx={{ display: 'flex' }}>
//       <CircularProgress />
//       </Box>
//     )

//   } else{
//     return <Component {...rest}/>
//   }
  
// }

export default AuthRoute;