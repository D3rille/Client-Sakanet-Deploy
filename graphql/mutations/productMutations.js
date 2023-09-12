import {gql} from '@apollo/client';

export const CREATE_PRODUCT= gql`
  mutation CreateProduct($product: ProductInput) {
    createProduct(product: $product)
    }
`;


