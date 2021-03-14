import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './app/redux/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import Home from './app/screens/Home/ui/HomeUI';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Home />
      </PersistGate>
    </Provider>
  );
}
