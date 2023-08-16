import {useQuery} from '@apollo/client';
import Avatar from '@mui/material/Avatar';

import { Button, CircularProgress } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import styles from '../../styles/Navbar.module.css';
import toast from 'react-hot-toast';

import { GET_CONNECTED_USERS} from '../../graphql/queries/myNetworkQueries';
import { formatWideAddress } from '../../util/addresssUtils';


function MyConnectionList(){
    const {data, loading, error} = useQuery(GET_CONNECTED_USERS);
  
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
    if(data?.getConnectedUsers?.length==0){
      return (
        <>
        <div sx={{textAlign:"center", width:"100%"}}>
          <p >No Connected Users</p>
        </div>
        </>
      
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
              <h2>{user.username}</h2>
              <p className={styles.title}>{formatWideAddress(user.address)}</p>
            </div>
            </div>
            <div className={styles.messageactions}>
              <Button className={styles.messageactionsBtn}>
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