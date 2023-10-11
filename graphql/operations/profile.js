import { gql } from '@apollo/client';

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      connections
      profile {
        _id
        profile_pic
        firstName
        lastName
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
        role
        rating
        ratingStatistics {
          oneStar
          twoStar
          threeStar
          fourStar
          fiveStar
          totalStars
          lastStarRating
          reviewerCount
        }
        joined_group
        managed_group
        displayName
        lastOpenedConvo
        description
        date_joined
      }
    }
  }
`;
