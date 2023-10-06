import React, {useEffect, useState} from 'react';
import { Grid, Paper, styled } from '@mui/material';
import RecentChatsList from '../../components/Chats/RecentChatsList';
import ChatExchange from '../../components/Chats/ChatExchange';
import ChatInfoPanel from '../../components/Chats/ChatInfoPanel';
import CreateConvo from '../../components/Chats/CreateConvo';
import { useMutation, useQuery} from '@apollo/client';
import { 
    CREATE_CONVO, 
    GET_MESSAGES,
    READ_CONVO, 
    SEND_MESSAGE, 
    NEW_MESSAGE, 
    ADD_PARTICIPANTS,
    KICKOUT_PARTICIPANT,
    LEAVE_GROUPCHAT,
} from '../../graphql/operations/chat';
import toast from "react-hot-toast";
import {useSubs} from "../../context/SubscriptionProvider";
import { useRouter } from 'next/router';

const StyledGridContainer = styled(Grid)({
    minHeight: '100vh',
    background: '#F4F4F4',
});

const StyledPaperContainer = styled(Paper)({
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFEFE',
    textAlign: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '6rem',
    borderRadius: '20px',
    overflow: 'hidden',
});

const StyledRecentChatsList = styled(RecentChatsList)({
    flex: 1,
});

const ChatsPage = () => {
    const router = useRouter();
    const {profile} = useSubs();
    const [newConvo, setNewConvo] = useState(false);
    // const [currentConvoId, setCurrentConvoId] = useState(profile?.lastOpenedConvo ?? "");
    const userId = router.query?.userId;
    const convoId = router.query?.convoId;
    
    const [createConvo] = useMutation(CREATE_CONVO);//  this is used only on the search  on the left panel
    const [readConvo] = useMutation(READ_CONVO);
    const [sendMessage] = useMutation(SEND_MESSAGE);
    const [addParticipants] = useMutation(ADD_PARTICIPANTS);
    const [kickOut] = useMutation(KICKOUT_PARTICIPANT);
    const [leaveGroupChat] = useMutation(LEAVE_GROUPCHAT);
    
    try {
        var {
            data:getMessagesData, 
            loading:getMessagesLoading, 
            error:getMessagesError, 
            refetch:refetchMessages, 
            subscribeToMore:subscribeToNewMessage} = useQuery(GET_MESSAGES, {
            variables:{conversationId:convoId ?? ""},
        });
        
    } catch (error) {
        console.error(error);
    }
       
    useEffect(() => {
        const unsubscribe = subscribeToNewMessage({
          document: NEW_MESSAGE,
          variables: { conversationId: convoId ?? "" },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.newMessage;
            
            // Check if prev.getMessages is undefined and initialize it
            if (!prev.getMessages) {
              return {
                getMessages: {
                  messages: [newMessage]
                }
              };
            }
      
            return {
              getMessages: {
                ...prev.getMessages,
                messages: [...(prev.getMessages.messages || []), newMessage]
              }
            };
          }
        });
      
        return () => {
          // Cleanup: Unsubscribe from the subscription when the component unmounts
          unsubscribe();
        };
      }, [convoId]);

    useEffect(()=>{
        if(profile){
            router.replace(`/Chats?convoId=${profile?.profile.lastOpenedConvo}`);
            // setCurrentConvoId(profile?.profile.lastOpenedConvo)
        }
    },[profile]);

    
    const handleSendMessage = async( conversationId, message) =>  {
        try {
            
            await sendMessage({
                variables:{conversationId, message},
                refetchQueries:[{
                    query:GET_MESSAGES,
                    variables:{conversationId}
                }],
                onError:(error)=>{
                    toast.error(error.message)
                }
            });
        
        } catch (error) {
            console.error(error);
        }
    }
    
    // used only on the search on the Convo list panel
    const handleCreateConvo = async (chatPartnerId, isGroup) =>{
        try {
          await createConvo({
            variables:{chatPartnerId, isGroup},
            onCompleted:(data)=>{
                router.replace(`/Chats?convoId=${data?.createConversation}`)
                // setCurrentConvoId(data?.createConversation);
            }
          });

        } catch (error) {
          console.log(error);
        }
    };

    useEffect(()=>{
        if(userId){
            // use to create convo or find existing
            // when clicking to a message button outside 
            // of the chat page
            handleCreateConvo(userId, false);
        }
    },[])


    const handleStartNewConvo = () =>{
        setNewConvo(!newConvo);
    }
    return (
        <StyledGridContainer container>
            <Grid item xs={12}>
                <StyledPaperContainer elevation={3}>
                    <RecentChatsList 
                        newConvo={newConvo} 
                        handleStartNewConvo={handleStartNewConvo} 
                        handleCreateConvo={handleCreateConvo}
                        // setCurrentConvoId={setCurrentConvoId}
                        currentConvoId={convoId}
                        readConvo={readConvo}
                    />
                    {newConvo && (<CreateConvo 
                    // handleCreateNewConvo={handleCreateNewConvo}
                    // createNewConvo ={createNewConvo}
                    // createNewConvoData = {createNewConvoData}
                    // createGroupChat = {createGroupChat}
                    // createGroupChatData={createGroupChatData}
                    handleSendMessage={handleSendMessage}
                    handleStartNewConvo={handleStartNewConvo}
                    // setCurrentConvoId = {setCurrentConvoId}
                    currentConvoId={convoId}
                    />)}
                    {!newConvo && (
                    <ChatExchange  
                        getMessagesData = {getMessagesData}
                        getMessagesLoading = {getMessagesLoading}
                        getMessagesError = {getMessagesError}
                        handleSendMessage={handleSendMessage}
                        conversationId={convoId}
                    />
                    )}  
                    <ChatInfoPanel 
                        getMessagesData={getMessagesData}
                        addParticipants={addParticipants} 
                        kickOut={kickOut}
                        leaveGroupChat={leaveGroupChat}
                        currentConvoId={convoId} 
                    /> 
                </StyledPaperContainer>
            </Grid>
        </StyledGridContainer>
    );
};


export default ChatsPage;
