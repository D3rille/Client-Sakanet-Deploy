import { gql } from '@apollo/client';

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      _id
      profile_pic
      username
      address {
        street
        barangay
        cityOrMunicipality
        province
        region
      }
      is_verified
      role
      rating
      ratingStatistics {
        oneStar
        twoStar
        threeStar
        fourStar
        fiveStar
        totalStars
        reviewerCount
      }
    }
  }
`;
