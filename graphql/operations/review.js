import { gql } from '@apollo/client';


//Just copy paste from apollo playground
export const GET_ALL_REVIEWS = gql`
    query GetAllReviews($subjectedUser: String) {
        getAllReviews(subjectedUser: $subjectedUser) {
            _id
            reviewerId
            username
            profile_pic
            subjectedUser
            rate
            comment
            date
            edited
        }
    }
 `;


