// import redux
import {createStore, combineReducers} from 'redux';

// import redux reducers
import {addSomethingReducer} from '../reducers';

// define app reducers
const appReducers = combineReducers({
  // you need to add your reducers here
  addSomethingReducer,
});

// export store
export const store = createStore(appReducers);
