import React from 'react';
import { Provider } from 'react-redux';
import Layout from './components/Layout/index';
import configureStore from './configureStore';

const store = configureStore();

const App = () => (
  <>
    <header>
      <h1>Gitlab CI App</h1>
    </header>
    <Provider store={store}>
      <Layout />
    </Provider>
  </>
);

export default App;