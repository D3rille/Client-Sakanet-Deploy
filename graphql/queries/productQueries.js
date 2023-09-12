import {gql} from "@apollo/client";

export const GET_ALL_MARKET_PRODUCTS = gql`
 query GetAllMarketProducts($type: String, $limit: Int, $page: Int) {
  getAllMarketProducts(type: $type, limit: $limit, page: $page) {
    product {
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
    totalProduct
  }
}
`;


export const GET_AVAILABLE_MARKET_PRODUCTS = gql`
query GetAvailableMarketProducts($type: String, $limit: Int, $page: Int) {
  getAvailableMarketProducts(type: $type, limit: $limit, page: $page) {
    product {
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
    totalProduct
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

export const GET_SUGGESTED_PRODUCT = gql`
query GetSuggestedProducts($category: String, $itemId: String, $filter: productFilter) {
  getSuggestedProducts(category: $category, itemId: $itemId, filter: $filter) {
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
        reviewerCount
      }
      product {
        _id
        category
        product_description
        photo
        seller {
          id
          name
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
        status
      }
    }
  }
`;

export const SEARCH_ALL_PRODUCT = gql`
 query SearchAllMarketProduct($type: String, $searchInput: String) {
  searchAllMarketProduct(type: $type, searchInput: $searchInput) {
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

export const SEARCH_AVAILABLE_PRODUCT = gql`
 query SearchAvailableMarketProduct($type: String, $searchInput: String) {
  searchAvailableMarketProduct(type: $type, searchInput: $searchInput) {
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

export const GET_MY_PRODUCTS = gql`
  query GetMyProducts($category: String, $limit: Int, $page: Int, $status: String) {
    getMyProducts(category: $category, limit: $limit, page: $page, status: $status) {
      totalProduct
      product {
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
  }
`;

export const SEARCH_MY_PRODUCTS = gql`
  query SearchMyProducts($category: String, $status: String, $searchInput: String) {
    searchMyProducts(category: $category, status: $status, searchInput: $searchInput) {
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

export const GET_MARKET_PRODUCT = gql`
  query GetMarketProduct($productId: String) {
    getMarketProduct(productId: $productId) {
      _id
      name {
        english
        tagalog
      }
      photo
      type
      units
    }
  }
`;
