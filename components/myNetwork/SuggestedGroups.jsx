import {Card, Avatar, Typography} from "@mui/material";
import {useQuery, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import Link from "next/link";

import styles from '../../styles/Navbar.module.css';
import { GET_SUGGESTED_GROUPS, JOIN_POOL_GROUP } from "../../graphql/operations/poolGroup";
import CircularLoading from "../circularLoading";

export const SuggestedGroups = () =>{
    const [joinPoolGroup] = useMutation(JOIN_POOL_GROUP);

    const handleJoinPoolGroup = (poolGroupId) =>{
        try {
            joinPoolGroup({
                variables:{
                    poolGroupId
                },
                refetchQueries:[GET_SUGGESTED_GROUPS], 
                onCompleted:(data)=>{
                    toast.success(data?.joinPoolGroup);
                },
                onError:(error)=>{
                    toast.error(error.message);
                }
            })
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    try {
        var {data, loading, error} = useQuery(GET_SUGGESTED_GROUPS, {
            onError:(error)=>{
                toast.error(error.message);
            }
        });
        
    } catch (error) {
        toast.error("something went wrong");
        console.error(error)
    }

    if (loading){
        return(
            <div style={{display:"flex", margin:"auto"}}>
                <CircularLoading/>
            </div>
        )
    }

    if (error){
        <div>
            <Typography>Something went wrong. Check your connection.</Typography>
        </div>
    }

    if(!data || data?.getSuggestedGroups.length == 0){
        return(
            <Typography sx={{color:"#e5e5e5", padding:"1em"}}>No Groups</Typography>
        )
    }
    
    if(data){
        return(
            <>
                {data?.getSuggestedGroups.map((group)=>(
                    <div key={group._id} className={styles.cardprofile}>
                    <Card elevation={2} 
                    sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'0px 0px 10px 0px',height:'max-Content',width:'170px',minHeight:'150px',border:'none'}}
                    >
                    <div className={styles.backgroundimg} style={{backgroundImage:`url(${group.cover_photo})`}}>
                    <div className={styles.circular} style={{padding:'5px',borderRadius:'50%',position:'relative'}}>

                    <Link href={`/Groups?groupId=${group._id}`}>
                        <Avatar alt={group.groupName} src={group.profile_pic} size="lg" />
                    </Link>

                    </div>
                    </div>
                    <div style={{margin:'5px',textAlign:'center',height:'30px'}}>

                    <Link href={`/Groups?groupId=${group._id}`}>
                        <h2 style={{fontSize:'12px',fontWeight:'300'}}>{group.groupName}</h2>
                    </Link>

                    </div>
                    <div style={{display:'flex'}}>
                    <button 
                    className={styles.acceptbtn}
                    onClick={()=>{
                        handleJoinPoolGroup(group._id);
                    }}
                    >
                        Join
                    </button>
                    </div>
                    </Card>
                    </div>
                ))}
            </>
        )
    }

}


export default SuggestedGroups;