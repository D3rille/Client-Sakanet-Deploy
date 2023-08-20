//@ts-nocheck
import Head from 'next/head';
import { useRouter } from 'next/router.js';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AuthRoute from '@/util/AuthRoute'
import { useQuery,useMutation, useSubscription } from '@apollo/client';
import {gql} from '@apollo/client';
import TestNotif from "../components/testNotifications.jsx";
import { AuthContext } from '@/context/auth';
import {useState, useContext, forwardRef , useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {user} = useContext(AuthContext);
  const router = useRouter();


  const CREATE_POST = gql`
    mutation CreatePost($body: String!) {
      createPost(body: $body) {
        id
        body
        createdAt
        author
        username
      }
    }
    `;

  const POST_SUB = gql`
    subscription NewPost {
      newPost {
        id
        body
        createdAt
        author
        username
      }
  }
  `;


const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      _id
      receiverId
      from
      photo
      type
      message
      createdAt
      read
    }
  }
  `;

const NOTIF_SUB = gql`
  subscription NewNotification($receiverId: String) {
    newNotification(receiverId: $receiverId) {
      _id
      receiverId
      photo
      from
      type
      message
      createdAt
      read
    }
  }
`;
  // const { subscribeToMore, data:notifData} = useQuery(
  //   GET_NOTIFICATIONS,
  // );


  const [post, setBody]= useState("Add post body here");
  const [execute, {loading, data}] = useMutation(CREATE_POST, {
    update(proxy, {data:{createPost:postData}}){
        console.log(postData);
    },
    // Display error
    onError(err){
      try{
        // console.log(err.graphQLErrors[0].extensions.errors);
        console.log("There is an error.");
      }catch(e){
        console.log("Error: ", e);
      }
       

    },
    // display toast upon completion
    onCompleted:(data)=>{
        console.log("It is Successful");
    },
    //variables to pass on mutation, copy paste from apollo playground then only change the value
    variables:{
      "body": post
    }
  });

  const variable = "testDynamic"

  // function executePost(){
  //   execute();
  // }
  // const { data:postNotifData, loading:postNotifLoading } = useSubscription(POST_SUB);
  // console.log("notifData");
  // console.log(notifData);
  return (
    <>
      <Head>
        <title>SakaNet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1>This is the home page</h1> */}

      <div style={{marginTop:"200px"}}> 

      <Box
        sx={{
          width:"50%",
          margin:"auto"
        }}
      >
        <TextField
          required
          fullWidth
          id="body"
          label="Post Body"
          name="body"
          variant="outlined"
          value={post}
          onChange={(e) => setBody(e.target.value)}
          InputProps={{ style: { color: '#02452d' } }}
          InputLabelProps={{ style: { color: '#02452d' } }}
        />
        <Button
           type="button"
           variant="contained"
           fullWidth= {true}
           onClick={(event) => {
            event.preventDefault();
            execute();
          }}
           size="large"
           sx={{
           mt: "15px",
           mr: "20px",
           borderRadius: 28,
           color: "#ffffff",
           minWidth: "170px",
           backgroundColor: "#02452d",
           '&:hover': {
               backgroundColor: '#FF9A01',
           },
           }}
        >
          Post
        </Button>
        <Button
      onClick={()=>{
        router.push(`/testPage/${variable}`);
      }}
      sx={{
        mt: "15px",
        mr: "20px",
        borderRadius: 28,
        color: "#ffffff",
        minWidth: "170px",
        backgroundColor: "#02452d",
        '&:hover': {
            backgroundColor: '#FF9A01',
        },
        }}
      >
        To Dynamic Page
      </Button>

      </Box>

      <Box sx={{color:"black",  width:"50%",margin:"auto"}}>
        <h1>Posts</h1>
        {data && data.createPost && (
          <div>
            <p>{loading ? "Loading...":"Id: "+ data.createPost.id}</p>
            <p>{loading ? "Loading...":"username: "+data.createPost.username}</p>
            <p>{loading ? "Loading...":"author: " + data.createPost.author}</p>
            <p>{loading ? "Loading...":"body: " +data.createPost.body}</p>
            <p>{loading ? "Loading...":"createdAt: " + data.createPost.createdAt}</p>
          </div>
        )}
        
      </Box>


      {/* <Box sx={{width:"50%", margin:"auto"}}>
        <h1>Notification</h1>
        {
          postNotifLoading ? "Loading..":(
            <>
            <p>{postNotifData.newPost.username}</p>
            <p>{postNotifData.newPost.body}</p>
            <p>{postNotifData.newPost.createdAt}</p>
            </>
          )
          
        }
        
      </Box> */}
      
      {/* <TestNotif notifData ={notifData}
          subscribeToMoreNotif={() =>
            subscribeToMore({
              document: NOTIF_SUB,
              variables: { receiverId:user.id },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newNotif = subscriptionData.data.newNotification;
                // console.log("Prev: " );
                // console.log(prev);
                
                return Object.assign({}, prev, {
                  getNotifications: [newNotif, ...prev.getNotifications]
                
                });
              }
            })
          }
        /> */}


      </div>

    </>
  )
}
