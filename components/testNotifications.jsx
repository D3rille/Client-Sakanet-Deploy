import {useQuery} from "@apollo/client";
import {useEffect} from 'react';
import Box from "@mui/material/Box";
function TestNotifs ({subscribeToMoreNotif, notifData}){
    useEffect(()=>subscribeToMoreNotif(),[])
    // console.log("In TestNotif");
    // console.log(notifData);
    if(!notifData || notifData == []){
        return(<p>No Notifications</p>);
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