import {gql} from '@apollo/client';

//Just copy paste from apollo playground
export const GET_ORDERS = gql`
    query GetOrders($status: String) {
    getOrders(status: $status) {
        _id
        type
        createdAt
        buyer {
        id
        name
        }
        seller {
        id
        name
        }
        unit
        productId
        quantity
        status
        buyerResponse
        modeOfPayment
        deliveryAddress
        phoneNumber
        sellerResponse
        marketProductName
        price
        totalPrice
    }
    }
 `;
export const UPDATE_STATUS = gql`
    mutation UpdateStatus($orderId: String) {
        updateStatus(orderId: $orderId)
    }
`;

export const CANCEL_ORDER = gql`
    mutation CancelOrder($orderId: String) {
    cancelOrder(orderId: $orderId)
    }
`;
export const DECLINE_ORDER = gql`
    mutation DeclineOrder($orderId: String, $reason: String) {
        declineOrder(orderId: $orderId, reason: $reason)
    }
`;


