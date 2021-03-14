// import redux
import {createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

// import redux reducers
import {ReceiptReducer} from '../reducers';

// define app reducers
const appReducers = combineReducers({
  // you need to add your reducers here
  ReceiptReducer,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['ReceiptReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export store
export const store = createStore(appReducers);

export const persistor = persistStore(store);
