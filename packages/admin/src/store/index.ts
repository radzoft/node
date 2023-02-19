
import { configureStore } from '@reduxjs/toolkit';

import * as auth from './auth';

import {AuthState} from './auth'
export interface Store {
  auth: AuthState
}

export const store = configureStore({
  reducer: { [auth.KEY]: auth.reducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});