import {gql} from '@apollo/client';

export const READ_ALL_NOTIF= gql`
  mutation Mutation {
    readAllNotifications
    }
`;

export const DELETE_NOTIFICATION= gql`
  mutation DeleteNotification($notificationId: String) {
  deleteNotification(notificationId: $notificationId)
}
`;

export const CLEAR_NOTIFICATIONS=gql`
  mutation Mutation {
    clearNotifications
  }
`
