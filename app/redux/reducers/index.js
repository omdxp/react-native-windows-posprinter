import {ADD_SOMETHING} from '../constants';

// write your redux reducers here
export const initState = {
  something: '',
};

export const addSomethingReducer = (state = initState, action) => {
  switch (type) {
    case ADD_SOMETHING:
      return {
        ...state,
        something: action.payload,
      };

    default:
      return state;
  }
};
