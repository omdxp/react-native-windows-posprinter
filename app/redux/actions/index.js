import {UPDATE_RECEIPT, UPDATE_QUANTITY_RECEIPT} from '../constants';

// write your redux action creators here
export const updateReceipt = (payload) => ({
  type: UPDATE_RECEIPT,
  storeName: payload.storeName,
  address: payload.address,
  phoneNumber: payload.phoneNumber,
  numberOfCopies: payload.numberOfCopies,
});

export const updateQuantityReceipt = () => ({
  type: UPDATE_QUANTITY_RECEIPT,
});
