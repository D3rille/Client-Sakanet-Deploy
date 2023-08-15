import {gql} from '@apollo/client';

 export const GET_POSTS_QUERY = gql`
    query getPosts {
        getPosts {
            id
            author
            username
            body
            commentCount
            comments {
            body
            createdAt
            id
            username
            }
            createdAt
            likeCount
            likes {
            createdAt
            id
            username
            }
            
        }
    }
`;