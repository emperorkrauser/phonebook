import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice, authSlice } from './reducers';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    auth: authSlice.reducer,
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
