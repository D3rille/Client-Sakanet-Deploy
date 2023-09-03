import {gql} from '@apollo/client';

export const READ_ALL_NOTIF= gql`
  mutation Mutation {
    readAllNotifications
    }
`;
