import { gql } from '@apollo/client';


//Just copy paste from apollo playground
export const GET_USER_INFO = gql`
   query GetUserInfo($searchInput: String) {    
        getUserInfo(searchInput: $searchInput) {
            _id
            profile_pic
            firstName
            lastName
            middleName
            suffix
            displayName
            description
            date_joined
            username
            address {
            street
            barangay
            cityOrMunicipality
            province
            region
            }
            account_email
            account_mobile
            emails
            mobile_nums
            is_verified
            role
            rating
            cover_photo
            verification_photo
            verification_status
        }
    }
`;

export const GET_PENDING_VERIFICATIONS = gql`
    query GetPendingVerifications {
    getPendingVerifications {
        _id
        profile_pic
        firstName
        middleName
        lastName
        suffix
        birthdate
        displayName
        description
        date_joined
        cover_photo
        username
        address {
        street
        barangay
        cityOrMunicipality
        province
        region
        }
        account_email
        account_mobile
        emails
        mobile_nums
        is_verified
        verification_photo
        verification_status
        lastOpenedConvo
        role
        rating
    }
    }
`;

export const GET_ALL_CROPS = gql`
    query GetAllCrops($type: String) {
        getAllCrops(type: $type) {
            _id
            name {
            english
            tagalog
            }
            photo
            type
            farmGatePrice
            priceChange
            units
        }
    }
`;

export const VERIFY_USER  = gql`
    mutation VerifyUser($userId: String) {
        verifyUser(userId: $userId)
    }
`;

export const UNVERIFY_USER  = gql`
    mutation UnverifyUser($userId: String) {
        unverifyUser(userId: $userId)
    }
`;

export const REJECT_VERIFICATION = gql`
mutation RejectVerification($userId: String) {
  rejectVerification(userId: $userId)
}
`;

export const DELETE_USER = gql`
mutation DeleteUser($userId: String, $role: String) {
  deleteUser(userId: $userId, role: $role)
}
`;

export const UPDATE_FARMGATE_PRICE = gql`
mutation UpdateFarmGatePrice($cropId: String, $newPrice: Float) {
  updateFarmGatePrice(cropId: $cropId, newPrice: $newPrice)
}
`;