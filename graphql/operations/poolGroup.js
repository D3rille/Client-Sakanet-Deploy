import { gql } from '@apollo/client';


//Just copy paste from apollo playground
export const GET_MANAGED_GROUPS = gql`
    query GetManagedGroups {
        getManagedGroups {
            groupName
            profile_pic
            _id
        }
    }
`;

export const GET_JOINED_GROUPS = gql`
    query GetJoinedGroups {
        getJoinedGroups {
            profile_pic
            groupName
            _id
        }
    }
`;

export const GET_SUGGESTED_GROUPS = gql`
    query GetSuggestedGroups {
        getSuggestedGroups {
            _id
            groupName
            profile_pic
            cover_photo
        }
    }
`;

export const CREATE_POOL_GROUP  = gql`
    mutation CreatePoolGroup($groupName: String, $groupDescription: String) {
        createPoolGroup(groupName: $groupName, groupDescription: $groupDescription)
    }
`;

export const JOIN_POOL_GROUP = gql`
    mutation JoinPoolGroup($poolGroupId: String) {
    joinPoolGroup(poolGroupId: $poolGroupId)
    }
`;

