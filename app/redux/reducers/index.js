import {UPDATE_RECEIPT, UPDATE_QUANTITY_RECEIPT} from '../constants';

// write your redux reducers here
export const initState = {
  storeName: '',
  address: '',
  phoneNumber: '',
  numberOfCopies: '',
  quantityPrinted: 0,
};

export const ReceiptReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_RECEIPT:
      return {
        ...state,
        storeName: action.storeName,
        address: action.address,
        phoneNumber: action.phoneNumber,
        numberOfCopies: action.numberOfCopies,
      };

    case UPDATE_QUANTITY_RECEIPT:
      return {
        ...state,
        quantityPrinted: state.quantityPrinted + 1,
      };

    default:
      return state;
  }
};
