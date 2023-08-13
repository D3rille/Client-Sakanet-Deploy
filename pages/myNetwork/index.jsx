import React, { useEffect, useState, useContext } from 'react';
import {useMutation} from '@apollo/client';
import groupicon from '../../public/images/Screenshot 2023-07-23 102237.png';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Card, Link, CircularProgress } from '@mui/material';
import styles from '../../styles/Navbar.module.css';
import { AuthContext } from '@/context/auth';
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';

import MyConnectionList from '../../components/myNetwork/MyConnectionList';
import Requests from '../../components/myNetwork/Requests';
import SuggestedUsers from '../../components/myNetwork/SuggestedUser';
import { GET_CONNECTED_USERS, GET_CONNECTION_REQUESTS, GET_SUGGESTED_USERS } from '../../graphql/queries/myNetworkQueries';
import { ACCEPT_CONNECTION, DECLINE_CONNECTION, REQUEST_CONNECTION } from '../../graphql/mutations/MyNetworkMutations';
import default_profile from "../../public/images/default_profile.jpg";
import { formatWideAddress } from '../../util/addresssUtils';
// const myConnectionList = [
//     {id:1,profile:'https://sp-images.summitpost.org/947006.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=d877834568578388ef13b78e3cd7ba2b',name:'Frank Devera',location:'Atimonan, Quezon'},
//     {id:2,profile:'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-For-Youtube-960x1024.jpg',name:'Dominic Fernandez',location:'Lopez, Quezon'},
//     {id:3,profile:'https://th.bing.com/th/id/OIP.A_MGXTU1u63B6CMT6CRgPgHaKH?pid=ImgDet&rs=1',name:'Robert Lucas',location:'Mauban, Quezon'},
//     {id:4,profile:'https://kaitlinzhang.com/wp-content/uploads/2017/03/how-to-take-a-profile-photo-personal-branding-kaitlin-zhang-15-1024x683.jpg',name:'Cristina Malubay',location:'Tayabas, Quezon'},
//     {id:5,profile:'https://th.bing.com/th/id/OIP.mXtxedkYGWBGYR_nGd6adQHaE6?pid=ImgDet&rs=1',name:'Lukas Reyes',location:'Tayabas, Quezon'},
// ]
const myGroups = [
    {id:1,profile:'https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?pid=ImgDet&rs=1',business:`Farmer's Business Network, Inc.`},
    {id:2,profile:'https://cdn2.f-cdn.com/files/download/38545966/4bce6b.jpg',business:`Farmer's Choice`},
    {id:3,profile:'https://dp.profilepics.in/profile-pictures-for-facebook-whatsapp/profile-pics/profile-pics-630.jpg',business:`Farmer Brother`},
    {id:4,profile:'https://burkeconsultingcorp.com/wp-content/uploads/2018/04/cropped-Profile-1024x1024.jpeg',business:`Agriproducts Networking Group`},
]
// const requests = [
//     {id:1,profile:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',name:'James Garcia',location:'Atimonan, Quezon'},
//     {id:2,profile:'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Geovanni Leffler',location:'Sariaya, Quezon'},
//     {id:3,profile:'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Trisha Moore',location:'Candelera, Quezon'},
//     {id:4,profile:'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Cristina Malubay',location:'Tayabas, Quezon'},

// ]
// const Suggestions = [
//     {id:1,profile:'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Abelardo Jacobi',location:'Atimonan, Quezon',background:'https://greenamerica.org/sites/default/files/pieces/istockag2.jpg'},
//     {id:2,profile:'https://images.pexels.com/photos/2589650/pexels-photo-2589650.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Jaylon Legros',location:'Sariaya, Quezon',background:'https://th.bing.com/th/id/OIP.sgPpIsjHAi6VeDiaz02KmAHaE7?pid=ImgDet&rs=1'},
//     {id:3,profile:'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Pierre Streich',location:'Candelera, Quezon',background:'https://th.bing.com/th/id/OIP.HtSFeKLKbn6p8PJV0xDiWAHaEF?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
//     {id:4,profile:'https://images.pexels.com/photos/2918513/pexels-photo-2918513.jpeg?auto=compress&cs=tinysrgb&w=600',name:'Cristina Malubay',location:'Tayabas, Quezon',background:'https://th.bing.com/th/id/OIP.cOkoDvCWEIipMjSy7Sgo7QHaEc?pid=ImgDet&rs=1'},
// ]
const join = [
    {id:1,profile:'https://i.pinimg.com/originals/9b/dc/92/9bdc929a29a72dce48be820a3552e84f.jpg',name:'Community Farmers',background:'https://images.all-free-download.com/images/graphiclarge/evidence_of_travel_513304.jpg'},
    {id:2,profile:'https://s3-media0.fl.yelpcdn.com/bphoto/DHnFNZO4UWbIvr5pYazUPA/l.jpg',name:'Tayabas Fruits and Vegetables Dealer',background:'https://live.staticflickr.com/5480/30578680495_54b06f54f1_b.jpg'},
    {id:3,profile:'https://i.pinimg.com/originals/d3/8b/6f/d38b6f63357e45fc0b15cf5886f80b94.jpg',name:'Bentahan ng gulay,prutas at iba pa',background:'https://media.istockphoto.com/photos/agriculture-picture-id606230424?k=6&m=606230424&s=170667a&w=0&h=lrZ_pR7QFuPJ-ErS0sTKXDbIygG7eSWytR361D4wev0='},
    {id:4,profile:'https://i.pinimg.com/originals/d3/ac/ca/d3accacfeee6aac91906765b1f4df13d.jpg',name:'Amplaya',background:'https://th.bing.com/th/id/OIP.kiTSqGB1nGLyb9kkpqKu6wHaE8?pid=ImgDet&rs=1'},
]


export default function MyNetwork(){
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

    const group = myGroups.map((data) =>{
      return(
        <div key={data.id} className={styles.grouplist}>
             <Avatar sx={{width:'30'}} alt="Travis Howard" src={data.profile} />
            {/* <Avatar sx={{ width: '30', height: 'auto'}} alt={data.name}>
                <Image src={data.profile} alt={data.name} width={30} height={30}/>
            </Avatar> */}
        <p style={{marginLeft:'10px',padding:0}}>{data.business}</p>
        </div>
      )
    })


    const joinlist = join.map((data) =>{
      return(
        <div key={data.id} className={styles.cardprofile}>
        <Card elevation={2} sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'0px 0px 10px 0px',height:'max-Content',width:'170px',minHeight:'150px',border:'none'}}>
        <div className={styles.backgroundimg} style={{backgroundImage:`url(${data.background})`}}>
          <div className={styles.circular} style={{padding:'5px',borderRadius:'50%',position:'relative'}}>
          <Avatar alt="Remy Sharp" src={data.profile} size="lg" />
            {/* <Avatar sx={{ width: '30', height: 'auto'}} alt={data.name} size="lg">
                <Image src={data.profile} alt={data.name} width={30} height={30}/>
            </Avatar> */}
          </div>
        </div>
          <div style={{margin:'5px',textAlign:'center',height:'30px'}}>
          <h2 style={{fontSize:'12px',fontWeight:'300'}}>{data.name}</h2>
          </div>
          <div style={{display:'flex'}}>
            <button className={styles.acceptbtn}>
              Join</button>
          </div>
        </Card>
        </div>
      )
    })
  
  return (
    <>
      <Toaster/>
      <div key='element1' className={styles.header}>
        <div key='element2' className={styles.content}>
            <div key='element3' className={styles.content1}>
            <Card sx={{width:'100%',height:'max-Content',borderRadius:'20px',padding:'15px 0px 10px 20px'}}>
                <div className={styles.contentheader}>
                  <Typography sx={{fontSize:'15px'}}>Manage my network</Typography>
                </div>
                <div>
                <div className={styles.myconnectionstitle}>
                  <div className={styles.myconnectionstitle}>
                    <Image sx={{width:'30px',height:'35px',marginTop:'-10px'}} src ={groupicon} alt = "Group" width={30} height={35}/>
                    {/* <img style={{width:'30px',height:'35px',marginTop:'-10px'}} alt="" src={groupicon} /> */}
                  <p className={styles.title}> My connections</p>
                  </div>
                  <div>
                    <p style={{fontSize:'12px'}}>28</p>
                  </div>
                </div>
                </div>
                <div className={styles.containerlist}>
                  {/* {list} */}
                  <MyConnectionList />
                </div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                  <Link sx={{color:'black',fontSize:'10px'}}>View all</Link>
                </div>
                <div className={styles.myconnectionstitle}>
                <div className={styles.myconnectionstitle}>
                    <Image sx={{width:'30px',height:'35px',marginTop:'-10px'}} src ={groupicon} alt = "Group" width={30} height={35}/> 
                  <Typography> Groups</Typography>
                  </div>
                  <div>
                    <p style={{fontSize:'12px'}}>7</p>
                  </div>
                </div>
                <div className={styles.mygroups}>
                  {group}
                </div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                  <Link sx={{color:'black',fontSize:'10px'}}>View all</Link>
                </div>
            </Card>
            </div>
            <div key='element4' className='content2'>
            <Card sx={{width:'100%',height:'max-Content',borderRadius:'20px',overflow:'visible'}}>
              <div style={{textAlign:'center'}}>
                <h1 style={{fontSize:'17px',margin:'25px 0px 15px 0px',color:'gray'}}>CONNECTIONS</h1>
              </div>
              <Card className={styles.contentCard} sx={{borderRadius:'12px',border:'0.5px solid #f1f3fa'}}>
                <div className={styles.contentCard1}>
                  <p style={{fontWeight:500}}>Requests</p>
                  <Link sx={{color:'black',fontSize:'12px'}}>View all</Link>
                </div>
                <div className={styles.requestlist}>
                  <Requests acceptConnection={acceptConnection} declineConnection={declineConnection}/>
                </div>
              </Card>
              <Card className={styles.contentCard} sx={{borderRadius:'12px',border:'0.5px solid #f1f3fa'}}>
                <div className={styles.contentCard1}>
                  <p style={{fontWeight:500}}>Suggestions</p>
                  <Link sx={{color:'black',fontSize:'12px'}}>View all</Link>
                </div>
                <div className={styles.requestlist}>
                  <SuggestedUsers requestConnection={requestConnection}/>
                </div>
              </Card>
              <Card className={styles.contentCard} sx={{borderRadius:'12px',border:'0.5px solid #f1f3fa'}}>
                <div className={styles.contentCard1}>
                  <p style={{fontWeight:500}}>You may want to join...</p>
                  <Link sx={{color:'black',fontSize:'12px'}}>View all</Link>
                </div>
                <div className={styles.requestlist}>
                  {joinlist}
                </div>
              </Card>
            </Card>
            </div>
        </div>
      </div>
    </>
  )
}
