import {useQuery} from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import { Button, CircularProgress, Typography } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import styles from '../../styles/Navbar.module.css';
import toast from 'react-hot-toast';
import Link from  '@mui/material/Link';
import {useRouter} from "next/router";

import { GET_CONNECTED_USERS} from '../../graphql/operations/myNetwork';
import { formatWideAddress, formatShortAddress } from '../../util/addresssUtils';
import CircularLoading from '../circularLoading';


function MyConnectionList(){
    const router = useRouter();
    const {data, loading, error} = useQuery(GET_CONNECTED_USERS);
  
    if (loading){return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CircularLoading/> 
      </div>
    );}
    else if(error){
      toast.error(error);
      return(<p>Error Loading Connected Users</p>)
    }
    if(data?.getConnectedUsers?.length==0){
      return (
        <Typography sx={{color:"#e5e5e5", padding:"auto", textAlign:"center"}}>No Connections</Typography>
        // <>
        // <div style={{textAlign:"center", display:"flex", justifyContent:"center",}}>
        //   <p >No Connected Users</p>
        // </div>
        // </>
      
      )
    }
    return(
      <>
      {
        data && data?.getConnectedUsers?.map((user) =>(
          <div key={user._id} className={styles.list}>
            <div className={styles.profilename}>
            <div>
              <Avatar sx={{width:'30'}} alt={user.username} src={user.profile_pic} />
              {/* <Avatar sx={{ width: '30', height: 'auto'}} alt={user.username}>
                  <Image src={default_profile} alt={user.username} width={30} height={30}/>
              </Avatar> */}
            </div>
            <div className={styles.details}>
              <Link className={styles.searchLink} onClick={()=>{
                  router.push(`/Find/${user._id}`);
              }} >
                <h2>{user.username}</h2>
              </Link>
              <p className={styles.title}>{formatShortAddress(user.address)}</p>
            </div>
            </div>
            <div className={styles.messageactions}>
              <Button className={styles.messageactionsBtn}
                onClick={()=>{
                  router.push(`/Chats?userId=${user._id}`);
                }}
              >
                <SmsIcon sx={{fontSize:'15px'}}/><p>Message</p>
              </Button>
            </div>
          </div>
          
        ))
      }
     
      </>
    );
  }

  export default MyConnectionList;