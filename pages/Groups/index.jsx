import {useState, useContext} from "react";
import { Container, Box, Grid } from '@mui/material';
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";

import {AuthContext} from "../../context/auth";
import CommunityInfo from "../../components/Groups/CommunityInfo";
import MembersList from "../../components/Groups/MembersList";
import ProductPools from "../../components/Groups/ProductPools";
import {GET_POOL_GROUP_INFO} from "../../graphql/operations/poolGroup";
import CircularLoading from "../../components/circularLoading";
import GuestView from "../../components/Groups/GuestView";
import CreatePoolGroupModal from "../../components/myNetwork/CreatePoolGroupModal";
import EditGroupInfo from "../../components/Groups/EditGroupInfo";

const Groups = () => {
    const router = useRouter();
    const {user} = useContext(AuthContext);
    const poolGroupId = router.query?.groupId;
    const [isModalOpen, setIsModalOpen] = useState("");

    const {data:getPoolGroupInfoData, loading:getPoolGroupInfoLoading, error:getPoolGroupInfoError} = useQuery(GET_POOL_GROUP_INFO, {
        variables:{
            poolGroupId
        }
    });



    // const handleAddProductPool = () => {
    // };
    if(getPoolGroupInfoLoading){
        return(
            <div style={{display:"flex", margin:"auto"}}>
                <CircularLoading/>
            </div>
        )
    }

    if(getPoolGroupInfoError){
        <div style={{textAlign:"center"}}>
            <p>{getPoolGroupInfoError?.message}</p>
        </div>
    }

    if(getPoolGroupInfoData && !getPoolGroupInfoLoading){
        const {
            groupName,
            groupDescription,
            applications,
            membersList,
            creator,
            admins,
            profile_pic,
            cover_photo,
            createdAt,
            membersCount
        } = getPoolGroupInfoData?.getPoolGroupInfo;
        
        const poolGroupInfo = {
            groupName,
            groupDescription,
            profile_pic,
            cover_photo,
            createdAt, 
            membersCount
        }

        let settingsItems=[
            {name:"Configure", function:()=>{setIsModalOpen("configure");}},
        ];

        const isAdmin = admins.includes(user.id);
        const isMember = membersList.includes(user.id);
        const isCreator = creator == user.id;

        if(creator == user.id){
            settingsItems.push( {name:"Delete Group", function:()=>{}})
        }
        // Members
        // Guest
        if(!isMember){
            const isPending =applications.includes(user.id);
            return(
                <GuestView isPending={isPending} data={poolGroupInfo} poolGroupId={poolGroupId}/>
            )
        } 
        // Admins
        if(isMember){
            return (
                <Container style={{ padding: 0, maxWidth: '90%' }}> 
                    <Box style={{ margin: '0 auto', marginTop: '6rem' }}>
                        <Grid container spacing={3} style={{ background: '#F4F4F4', minHeight: '100vh' }} justifyContent="flex-start">
        
                            <Grid item xs={3}>
                                <CommunityInfo isAdmin={isAdmin} data={poolGroupInfo} settingsItems={settingsItems}/>
                                <MembersList getPoolGroupInfoData={getPoolGroupInfoData} poolGroupId={poolGroupId}/>
                            </Grid>
        
                            <Grid item xs={9}>
                                <ProductPools poolGroupId={poolGroupId} isAdmin={isAdmin}/>
                            </Grid>
                        </Grid>
                        {isModalOpen=="configure" &&(
                            <EditGroupInfo
                                isOpen={Boolean(isModalOpen)} 
                                setIsOpen={setIsModalOpen} 
                                data={{poolGroupId, groupName, groupDescription}}
                            />
                        )}
                    </Box>
                </Container>
            );
        }
    }

};

export default Groups;
