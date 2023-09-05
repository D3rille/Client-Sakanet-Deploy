import {gql} from '@apollo/client';

export const SEARCH_USERS = gql`
    query SearchUsers($searchInput: String) {
        searchUsers(searchInput: $searchInput) {
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