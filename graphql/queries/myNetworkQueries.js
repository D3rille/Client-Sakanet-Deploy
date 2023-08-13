import {gql} from '@apollo/client';

//Just copy paste from apollo playground
export const GET_CONNECTED_USERS = gql`
 query GetConnectedUsers {
  getConnectedUsers {
    _id
    profile_pic
    cover_photo
    username
    address {
      street
      barangay
      province
      cityOrMunicipality
    }
  }
}
 `;

export const GET_CONNECTION_REQUESTS = gql`
  query GetConnectionRequests {
    getConnectionRequests {
      receiverId
      requesterId
      reqDate
      profile_pic
      address {
        street
        barangay
        cityOrMunicipality
        province
        region
      }
      requesterName
    }
  }
`;

export const GET_SUGGESTED_USERS = gql`
  query GetSuggestedUsers {
    getSuggestedUsers {
      _id
      profile_pic
      cover_photo
      username
      address {
        cityOrMunicipality
        province
        barangay
        street
      }
      role
      rating
    }
  }
`;
