import {gql} from '@apollo/client';


//Just copy paste from apollo playground
export const ACCEPT_CONNECTION = gql`
  mutation AcceptConnection($requester: String) {
  acceptConnection(requester: $requester) {
      message
  }
  }
`;

export const DECLINE_CONNECTION = gql`
  mutation DeclineConnection($requester: String) {
    declineConnection(requester: $requester) {
      message
    }
  }
`;

export const REQUEST_CONNECTION = gql`
  mutation RequestConnection($connectTo: String) {
    requestConnection(connectTo: $connectTo) {
      message
    }
  }
`;

export const REMOVE_CONNECTION = gql`
  mutation RemoveConnection($connectedUserId: String) {
    removeConnection(connectedUserId: $connectedUserId) {
      message
    }
  }
`;


