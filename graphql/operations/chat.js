import { gql } from '@apollo/client';


export const FIND_USERS = gql`
 query FindUsers($searchInput: String, $excludedIds: [String]) {
    findUsers(searchInput: $searchInput, excludedIds: $excludedIds) {
        _id
        username
        profile_pic
        role
        address {
        street
        barangay
        cityOrMunicipality
        province
        region
        }
    }
}
`;

export const FIND_USER_TO_CHAT = gql`
    query FindUserToChat($searchInput: String) {
    findUserToChat(searchInput: $searchInput) {
        _id
        username
        profile_pic
        role
        address {
        street
        barangay
        cityOrMunicipality
        province
        region
        }
    }
    }
`;

export const GET_MESSAGES = gql`
    query GetMessages($conversationId: String) {
    getMessages(conversationId: $conversationId) {
        _id
        recipientPic
        recipientUsername
        admin
        isGroup
        messages {
        profile_pic
        username
        conversationId
        sender
        message
        createdAt
        }
        
    }
    }
`;

export const GET_CONVERSATIONS = gql`
    query GetConversations {
        getConversations {
            _id
            name
            profile_pic
            hasSeenLastMessage
            participants
            lastMessage {
            from
            message
            createdAt
            }
        }
    }
`;

export const GET_GROUP_MEMBERS = gql`
    query GetGroupMembers($conversationId: String) {
        getGroupMembers(conversationId: $conversationId) {
            _id
            username
            profile_pic
            role
            address {
            street
            barangay
            cityOrMunicipality
            province
            region
            }
        }
    }
`;

export const CREATE_CONVO = gql`
    mutation CreateConversation($chatPartnerId: String, $isGroup: Boolean) {
        createConversation(chatPartnerId: $chatPartnerId, isGroup: $isGroup)
    }
`;

export const SEND_MESSAGE = gql`
    mutation SendMessage($conversationId: String, $message: String) {
    sendMessage(conversationId: $conversationId, message: $message)
    }
`;

export const READ_CONVO = gql`
    mutation ReadConvo($conversationId: String) {
        readConvo(conversationId: $conversationId)
    }
`;

export const CREATE_NEW_CONVO = gql`
    mutation CreateNewConversation($chatPartnerId: String) {
    createNewConversation(chatPartnerId: $chatPartnerId)
    }
`;

export const CREATE_GROUP_CHAT = gql`
    mutation CreateGroupChat($participants: [String], $groupName: String) {
        createGroupChat(participants: $participants, groupName: $groupName)
    }
`;

export const KICKOUT_PARTICIPANT = gql`
    mutation KickOutParticipant($groupChatId: String, $userToRemove: [String]) {
        kickOutParticipant(groupChatId: $groupChatId, userToRemove: $userToRemove)
    }
`;

export const ADD_PARTICIPANTS = gql`
    mutation AddParticipants($conversationId: String, $userIds: [String]) {
    addParticipants(conversationId: $conversationId, userIds: $userIds)
    }
`;

export const LEAVE_GROUPCHAT = gql`
    mutation LeaveGroupChat($groupChatId: String) {
        leaveGroupChat(groupChatId: $groupChatId)
    }
`;

export const NEW_MESSAGE = gql`
    subscription NewMessage($conversationId: String) {
    newMessage(conversationId: $conversationId) {
        profile_pic
        username
        conversationId
        sender
        message
        createdAt
    }
    }

`;




