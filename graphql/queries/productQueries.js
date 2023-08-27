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


export const GET_AVAILABLE_MARKET_PRODUCTS = gql`
query GetAvailableMarketProducts($type: String) {
  getAvailableMarketProducts(type: $type) {
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


export const GET_AVAILABLE_PRODUCTS = gql`
query GetAvailableProducts($category: String, $itemId: String, $filter: productFilter) {
  getAvailableProducts(category: $category, itemId: $itemId, filter: $filter) {
    _id
    category
    product_description
    photo
    seller {
      id
      name
      profile_pic
      rating
      address {
        street
        barangay
        cityOrMunicipality
        province
        region
      }
    }
    item {
      id
      englishName
      tagalogName
      photo
      product_type
    }
    unit
    price
    stocks
    minimum_order
    until
    dateOfHarvest
    area_limit
    modeOfDelivery
    pickup_location
    deletable
    status
    createdAt
  }
}
`;


export const GET_PRODUCT = gql`
query GetProduct($productId: String) {
  getProduct(productId: $productId) {
    _id
    category
    product_description
    photo
    seller {
      id
      name
      profile_pic
      rating
      address {
        street
        barangay
        cityOrMunicipality
        province
        region
      }
    }
    item {
      id
      englishName
      tagalogName
      photo
      product_type
    }
    unit
    price
    stocks
    minimum_order
    until
    dateOfHarvest
    area_limit
    modeOfDelivery
    pickup_location
    deletable
    status
    createdAt
  }
}
`;