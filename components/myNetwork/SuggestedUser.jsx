import {useQuery} from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import { Card, CircularProgress } from '@mui/material';
import styles from '../../styles/Navbar.module.css';
import toast from 'react-hot-toast';
import Link from  '@mui/material/Link';
import {useRouter} from "next/router";

import { GET_SUGGESTED_USERS } from '../../graphql/operations/myNetwork';
import { formatShortAddress } from '../../util/addresssUtils';


function SuggestedUsers({requestConnection}){
    const router = useRouter();
    const {data, error, loading} = useQuery(GET_SUGGESTED_USERS);
  
    if (loading){return (
      <>
         <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , width:"100%"}}>
          <CircularProgress/> 
        </div>
      </>);}
      else if(error){
        toast.error(error);
        return(<p>Error Loading Connected Users</p>)
      }
      if(data?.getSuggestedUsers?.length==0){
        return (
          <>
          <div sx={{textAlign:"center", width:"100%"}}>
            <p >No Suggested Users</p>
          </div>
          </>
        
        )
      }
  
  
      return(
        <>
        {data && data?.getSuggestedUsers?.map((user) =>(
          <div key={user._id} className={styles.cardprofile}>
            <Card elevation={2} sx={{display:'flex',flexDirection:'column',alignItems:'center',height:'170px',width:'170px',border:'none'}}>
            <div className={styles.backgroundimg} style={{backgroundImage:`url("https://greenamerica.org/sites/default/files/pieces/istockag2.jpg")`}}>
              <div className={styles.circular} style={{padding:'5px',borderRadius:'50%',position:'relative'}}>
              <Avatar alt={user.username} src={user.profile_pic} size="lg" />
                    {/* <Avatar sx={{ width: '30', height: 'auto'}} alt={data.name} size="lg">
                        <Image src={data.profile} alt={data.name} width={30} height={30}/>
                    </Avatar> */}
              </div>
            </div>
              <div style={{margin:'5px', textAlign:"center"}}>
              <Link className={styles.searchLink} onClick={()=>{
                  router.push(`/Find/${user._id}`);
              }} >
                 <h2 style={{fontSize:'12px'}}>{user.username}</h2>
              </Link>
              <p style={{fontSize:'12px'}}>{formatShortAddress(user.address)}</p>
              </div>
              <div style={{display:'flex'}}>
                <button className={styles.acceptbtn} onClick={()=>{requestConnection({variables:{"connectTo":user._id}})}}>
                  Connect</button>
              </div>
            </Card>
            </div>
            
          ))
        }
       
        </>
      );
  }

  export default SuggestedUsers;