import { useEffect } from "react";
import {Avatar, Typography} from "@mui/material";
import CircularLoading from "../circularLoading";
import {useQuery, useLazyQuery} from "@apollo/client";
import toast from "react-hot-toast";
import Link from "next/link";

import styles from '../../styles/Navbar.module.css';
import {GET_MANAGED_GROUPS} from "../../graphql/operations/poolGroup";
import { PulseLoader } from "react-spinners";

const ManagedGroups = () =>{
    // try {
    //     var {data, loading, error} = useQuery(GET_MANAGED_GROUPS, {
    //         onError:(error)=>{
    //             toast.error(error.message);
    //         }
    //     });
        
    // } catch (error) {
    //     toast.error("something went wrong");
    //     console.error(error)
    // }

    const [getManagedGroups, {data, loading, error}] = useLazyQuery(GET_MANAGED_GROUPS, {
        onError:(error)=>{
            toast.error(error.message);
        }
    });

    //query upon mounting
    useEffect(()=>{
        getManagedGroups();
    }, []);

  if (loading) {
    return (
      <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
          width: "100%",
        }}
      >
        <PulseLoader color="#2E603A" />
      </div>
      </>
    );
  }

    if (error){
        <div>
            <Typography>Something went wrong. Check your connection.</Typography>
        </div>
    }

    if(!data || data?.getManagedGroups.length == 0){
    return (
      <div
        style={{
          color: "#e5e5e5",
          marginLeft: "3rem",
          marginTop: "5px",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "14px",
        }}
      >
        <p>No Groups</p>
      </div>
    );
    }
    
    if(data){
        return(
            <>
                {data?.getManagedGroups.map((group)=>(
                    <div key={group._id} className={styles.grouplist} >
                        {/* `/Groups?groupId=${group._id}` */}
            <Link href={`/Groups/${group._id}`}>
              <Avatar
                sx={{ width: "32px", height: "32px" }}
                alt="Avatar"
                src={group?.profile_pic}
              />
            </Link>
                            <Link href={`/Groups/${group._id}`}>
                                <p style={{marginLeft:'10px',padding:0}}>{group?.groupName}</p> 
                            </Link>
                    </div>)
                )}
            </>
        )
    }




}

  export default ManagedGroups;