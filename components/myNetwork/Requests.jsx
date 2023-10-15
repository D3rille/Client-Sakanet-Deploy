import {useQuery} from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import { Card,CircularProgress } from '@mui/material';
import styles from '../../styles/Navbar.module.css';
import toast from 'react-hot-toast';
import Link from  '@mui/material/Link';
import {useRouter} from "next/router";


import {GET_CONNECTION_REQUESTS} from '../../graphql/operations/myNetwork';
import { formatWideAddress } from '../../util/addresssUtils';

function Requests({acceptConnection, declineConnection}){
    const router = useRouter();
    const {data, loading, error} = useQuery(GET_CONNECTION_REQUESTS);
  
    if (loading){return (
      <>
         <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , width:"100%"}}>
          <CircularProgress/> 
        </div>
      </>);}
      else if(error){
        toast.error(error);
        return(<p>Error Loading Connection Requests</p>)
      }
      if(data?.getConnectionRequests?.length==0){
        return (
          <div sx={{display:"flex", margin:"auto", width:"100%"}}>
            <p >No Connection Requests</p>
          </div>
        )
      }
  
      return(
        <>
        {data && data?.getConnectionRequests?.map((request) =>(
          <div key={request.requesterId} className={styles.cardprofile}>
          <Card elevation={2} sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'10px',height:'155px',width:'150px',border:'none'}}>
            <div style={{border:'2px solid green',padding:'5px',borderRadius:'50%'}}>
              <Avatar alt={request.requesterName} src={request.profile_pic} size="lg" />
              {/* <Avatar sx={{ width: '30', height: 'auto'}} alt={data.name} size="lg">
                  <Image src={data.profile} alt={data.name} width={30} height={30}/>
              </Avatar> */}
            </div>
          <div style={{margin:'5px', textAlign:"center"}}>
            <Link className={styles.searchLink} onClick={()=>{
                router.push(`/Find/${request.requesterId}`);
            }} >
                <h2 style={{fontSize:'12px'}}>{request.requesterName}</h2>
            </Link>
          <p style={{fontSize:'12px'}}>{formatWideAddress(request.address)}</p>
          </div>
          <div style={{display:'flex'}}>
            <button className={styles.acceptbtn} onClick={()=>{acceptConnection({variables:{"requester":request.requesterId}})}}>
              Accept
            </button>
            <button className={styles.xbtn} onClick={()=>{declineConnection({variables:{"requester":request.requesterId}})}}>
              X
            </button>
          </div>
          </Card>
          </div>
      ))}
       
        </>
      );
  }

  export default Requests;