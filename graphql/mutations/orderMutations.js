import {gql} from '@apollo/client';

export const PLACE_ORDER = gql`
    mutation PlaceOrder($order: OrderInput) {
        placeOrder(order: $order)
    }
`;

