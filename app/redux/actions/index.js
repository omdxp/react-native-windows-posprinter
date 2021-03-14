import {ADD_SOMETHING} from '../constants';

// write your redux action creators here
export const addSomething = (something) => ({
  type: ADD_SOMETHING,
  payload: something,
});
