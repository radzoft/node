import {
  createAsyncThunk,
  createEntityAdapter,
  createReducer,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const KEY = 'auth';

export interface User {
  uid: string,
  name: string,
  email: string,
  token: string,
  picture: string
}

export interface AuthState {
  authenticated: boolean,
  user: User|null,
  initialized: boolean
}

export const initialState: AuthState = {
  authenticated: false,
  user:null,
  initialized:false
}

export const authSlice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    update: (state, {payload}:PayloadAction<User|null>)=>{
      state.user = payload;
      state.authenticated = payload!=null;
    },
    logout: (state)=>{
      state.authenticated=false;
      state.user=null;
    },
    init:(state)=>{
      state.initialized=true
    }
  },
});

export const reducer = authSlice.reducer;
export const {logout,update} = authSlice.actions;

export const actions = authSlice.actions;
