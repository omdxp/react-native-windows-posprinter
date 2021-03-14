// import redux
import {createStore, combineReducers} from 'redux';

// import redux reducers
import {ReceiptReducer} from '../reducers';

// define app reducers
const appReducers = combineReducers({
  // you need to add your reducers here
  ReceiptReducer,
});

// export store
export const store = createStore(appReducers);
