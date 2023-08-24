import {gql} from "@apollo/client";

export const GET_ALL_MARKET_PRODUCTS = gql`
  query Query($type: String) {
    getAllMarketProducts(type: $type) {
      _id
      name {
        english
        tagalog
      }
      photo
      type
      units
      averagePrice
      priceChange
    }
  }
`;