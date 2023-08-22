import {useQuery} from "@apollo/client";
import {useEffect} from 'react';
import Box from "@mui/material/Box";
import {useNotification} from "../context/notificationContext"

function TestNotifs (){
    const { notifData, subscribeToMoreNotif } = useNotification();

    useEffect(()=>subscribeToMoreNotif(),[])
    // console.log("In TestNotif");
    // console.log(notifData);
    if(!notifData || notifData == [] || notifData.length === 0){
        return(<p>No Notifications<br></br></p>);
    }
    return (
        <Box sx={{width:"50%", margin:"auto"}}>
        <h1>Notifications</h1>
        {
          notifData && notifData.getNotifications.map((notif)=>(
            <>
            <div key ={notif._id} style={{margin:"10px", border:"solid black 4px", background:"grey"}}>
                <p>{notif.receiverId}</p>
                <p>{notif.from}</p>
                <p>{notif.message}</p>
                <p>{notif.createdAt}</p>
            </div>
            
            </>
          ))
          
        }
        
      </Box>
    )
 
} 

export default TestNotifs;