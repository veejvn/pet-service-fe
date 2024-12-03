import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import GlobalStyles from './component/Layout/GlobalStyles/GlobalStyles';
import { Provider } from 'react-redux';
import reduxStore from './redux/store.redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
