import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app/app';
import { Authentication } from './app/components/Authentication';
import { store } from './store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <StrictMode>
      <Authentication>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Authentication>
    </StrictMode>
  </Provider>
);
