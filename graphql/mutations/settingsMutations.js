import { gql } from "@apollo/client";



export const UPDATE_DISPLAY_NAME = gql`
mutation Mutation($displayName: String) {
  changeDisplayName(displayName: $displayName)
}
`;