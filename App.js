import React from 'react';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import Home from './app/screens/Home/ui/HomeUI';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
