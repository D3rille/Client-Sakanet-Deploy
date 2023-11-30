import React, { useEffect, useState, useContext } from "react";
import groupicon from "../../public/icons/groups.svg";
import connectionsicon from "../../public/icons/connections.svg";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Card,
  Link,
  CircularProgress,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import styles from "../../styles/Navbar.module.css";
import { AuthContext } from "@/context/auth";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import MyConnectionList from "../../components/myNetwork/MyConnectionList";
import Requests from "../../components/myNetwork/Requests";
import SuggestedUsers from "../../components/myNetwork/SuggestedUser";
import default_profile from "../../public/images/default_profile.jpg";
import { formatWideAddress } from "../../util/addresssUtils";
import CreatePoolGroupModal from "../../components/myNetwork/CreatePoolGroupModal";
import ManagedGroups from "../../components/myNetwork/ManagedGroups";
import JoinedGroups from "../../components/myNetwork/JoinedGroups";
import SuggestedGroups from "../../components/myNetwork/SuggestedGroups";
import RefreshIcon from '@mui/icons-material/Refresh';
import Head from 'next/head';

import { useRouter } from 'next/router';
import {useMutation,  useQuery} from '@apollo/client';
import { GET_CONNECTED_USERS, GET_CONNECTION_REQUESTS, GET_SUGGESTED_USERS } from '../../graphql/operations/myNetwork';
import { ACCEPT_CONNECTION, DECLINE_CONNECTION, REQUEST_CONNECTION } from '../../graphql/operations/myNetwork';
import { GET_SUGGESTED_GROUPS } from '../../graphql/operations/poolGroup';

export default function MyNetworkPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user.role == 'ADMIN') {
      router.push('/404');
    }
  }, [user]);

  return user.role != 'ADMIN' ? <MyNetwork /> : null;
}

function MyNetwork(){
    const {user} = useContext(AuthContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState("");

    const suggestedUsersResults = useQuery(GET_SUGGESTED_USERS,{
      onError:(error)=>{
        toast.error(error.message);
        console.error(error);
      }
    });
    const suggestedGroupsResults = useQuery(GET_SUGGESTED_GROUPS, {
    });

    // Accept Connection
    const [acceptConnection, {data:acceptMutationData}] = useMutation(ACCEPT_CONNECTION,{
      refetchQueries:[
        GET_CONNECTED_USERS, GET_CONNECTION_REQUESTS
      ],
      onError:(err)=>{
        toast.error(err.graphQLErrors[0].message);
      },
      onCompleted:(acceptMutationData)=>{
        toast.success(acceptMutationData.acceptConnection.message);
      }
    });
    // Decline Request
    const [declineConnection, {data:declineMutationData}] = useMutation(DECLINE_CONNECTION,{
      refetchQueries:[
        GET_CONNECTED_USERS, GET_CONNECTION_REQUESTS
      ],
      onError:(err)=>{
        toast.error(err.graphQLErrors[0].message);
      },
      onCompleted:(declineMutationData)=>{
        toast(declineMutationData.declineConnection.message);
      }
    });

    // Request Connection
    const [requestConnection, {data:requestConnectionData}] = useMutation(REQUEST_CONNECTION,{
      refetchQueries:[GET_SUGGESTED_USERS],
      onError:(err)=>{
        toast.error(err.graphQLErrors[0].message);
      },
      onCompleted:(requestConnectionData)=>{
        toast.success(requestConnectionData.requestConnection.message);
      }
    });

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  
  return (
    <div style={{margin:"5em"}}>
      <Head>
        <title>My Network</title>
        <meta name="description" content="My Network page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={4}>
        {/* Side Card */}
        <Grid item xs={3}>
          <Card
            style={{
              maxheight: "60em",
              borderRadius: "15px",
              padding: "1em",
              boxShadow: "0 6px 8px 0 rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ minHeight: "20%", maxheight: "35%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginLeft: "0.4em", marginRight: "0.8em" }}>
                    <Image src={connectionsicon} alt="Group" width={28} />
                  </div>
                  <p className={styles.title} style={{ fontWeight: 500 }}>
                    My connections
                  </p>
                </div>
                <div className={styles.containerlist}>
                  <MyConnectionList />
                </div>
              </div>

              {user?.role == "FARMER" && (
                <div style={{ minHeight: "15%", maxheight: "32%" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>
                      <Image
                        src={groupicon}
                        alt="Group"
                        width={22}
                        height={22}
                      />
                    </div>
                    <p
                      className={styles.title}
                      style={{ marginLeft: "10px", fontWeight: 500 }}
                    >
                      {" "}
                      Groups you manage
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <IconButton
                        sx={{ padding: 0 }}
                        onClick={() => {
                          setIsOpen("create pool group");
                        }}
                      >
                        <AddIcon sx={{ color: "#2E603A" }} />
                      </IconButton>
                    </div>
                  </div>
                  <div
                    className={styles.containerlist}
                    style={{ padding: "auto", textAlign: "center" }}
                  >
                    <ManagedGroups />
                  </div>
                </div>
              )}

              {user?.role == "FARMER" && (
                <div style={{ minHeight: "15%", maxheight: "32%" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>
                      <Image
                        src={groupicon}
                        alt="Group"
                        width={22}
                        height={22}
                      />
                    </div>
                    <p
                      className={styles.title}
                      style={{ marginLeft: "10px", fontWeight: 500 }}
                    >
                      Groups you&apos;ve joined
                    </p>
                  </div>
                  <div
                    className={styles.containerlist}
                    style={{ padding: "auto", textAlign: "center" }}
                  >
                    <JoinedGroups />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Grid>


        {/* Content 2 */}
        <Grid item xs={9}>
          <Card
            style={{
              maxheight: "60em",
              borderRadius: "15px",
              paddingTop: "1.5em",
              boxShadow: "0 6px 8px 0 rgba(0,0,0,0.2)",
            }}
          >
              {/* <Typography sx={{color:"grey", fontSize:"1.2rem", fontWeight:"bold", textAlign:"center", mb:"1em"}}>Connections</Typography> */}
              <Grid container >
                  {/* Connection Requests */}
              <Grid item xs={12}>
                <Typography
                  sx={{
                    paddingLeft: "2em",
                    pb: "1em",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Connection Requests
                </Typography>
                <Card
                  className={styles.contentCard}
                  sx={{
                    borderRadius: "25px",
                    border: "0.5px solid #f1f3fa",
                    paddingBlock: "1em",
                    
                  }}
                >
                  <div className={styles.contentCard1}>
                    {/* <p style={{fontWeight:500}}>Requests</p> */}
                    {/* <Link sx={{color:'black',fontSize:'12px'}}>View all</Link> */}
                  </div>
                  <div className={styles.requestlist} style={{ display: "flex", overflowX: "auto" }}>
                    <Requests
                      acceptConnection={acceptConnection}
                      declineConnection={declineConnection}
                    />
                  </div>
                </Card>
              </Grid>
                  {/* Suggested Users */}
                  <Grid item xs={12}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", paddingBottom:"0.5em"}}>
                      <Typography sx={{paddingLeft:"2em", fontSize:"1rem", fontWeight:"bold"}}>Suggested Users</Typography>
                      <IconButton onClick={()=>{suggestedUsersResults.refetch()}} sx={{marginInline:"0.5em"}}>
                        <RefreshIcon/>
                      </IconButton>
                    </div>
                    <Card className={styles.contentCard} sx={{display:"flex",borderRadius:'12px',border:'0.5px solid #f1f3fa',  paddingBlock:"1em", overflowX:"scroll"}}>
                      <SuggestedUsers requestConnection={requestConnection} suggestedUsersResults={suggestedUsersResults}/>
                    </Card>
                  </Grid>

                  {/* Pool Groups you may join */}
                  {user?.role == "FARMER" && (<Grid item xs={12}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center",paddingBottom:"0.5em"}}>
                      <Typography sx={{paddingLeft:"2em", fontSize:"1rem", fontWeight:"bold"}}>Pool Groups you may join</Typography>
                      <IconButton onClick={()=>{suggestedGroupsResults.refetch()}} sx={{marginInline:"0.5em"}}>
                        <RefreshIcon/>
                      </IconButton>
                    </div>
                    <Card className={styles.contentCard} sx={{display:"flex", borderRadius:'12px',border:'0.5px solid #f1f3fa', paddingBlock:"1em", overflowX:"scroll"}}>
                        <SuggestedGroups suggestedGroupsResults={suggestedGroupsResults}/>
                    </Card>
                  </Grid>)}
              </Grid>
          </Card>
        </Grid>

      </Grid>
      {isOpen == "create pool group" && (<CreatePoolGroupModal isOpen={Boolean(isOpen)} setIsOpen={setIsOpen} />)}
    </div>
  )
}
