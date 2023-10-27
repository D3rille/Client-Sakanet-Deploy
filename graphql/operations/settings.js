import { gql } from "@apollo/client";


export const UPDATE_DISPLAY_NAME = gql`
mutation Mutation($displayName: String) {
  changeDisplayName(displayName: $displayName)
}
`;

export const ADD_DESCRIPTION = gql`
mutation AddDescription($description: String) {
  addDescription(description: $description)
}
`;

export const ADD_PAYMENT_CHANNEL = gql`
mutation AddPaymentChannel($paymentChannel: PaymentChannelInput) {
  addPaymentChannel(paymentChannel: $paymentChannel)
}
`;

export const EDIT_PAYMENT_CHANNEL = gql`
mutation EditPaymentChannel($channelId: String, $paymentChannel: PaymentChannelInput) {
  editPaymentChannel(channelId: $channelId, paymentChannel: $paymentChannel)
}
`;

export const DELETE_PAYMENT_CHANNEL = gql`
mutation DeletePaymentChannel($channelId: String) {
  deletePaymentChannel(channelId: $channelId)
}
`;

export const EDIT_ADDRESS = gql`
mutation EditAddress($addressInput: AddressInput) {
  editAddress(addressInput: $addressInput)
}
`;
