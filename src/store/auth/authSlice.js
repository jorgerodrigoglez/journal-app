import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      //status: 'not-authenticated', // 'checking', 'not-authenticated' -- 'authenticated'
      status: 'checking', // se cambia para mostrar el icono de carga - ui/components/CheckingAuth
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null
    },
    reducers: {
        login : ( state, { payload } ) => {
          state.status = 'authenticated';
          state.uid = payload.uid;
          state.email = payload.email;
          state.displayName = payload.displayName;
          state.photoURL = payload.photoURL;
          state.errorMessage = null;
        },
        logout : ( state, { payload } ) => {
          state.status = 'not-authenticated';
          state.uid = null;
          state.email = null;
          state.displayName = null;
          state.photoURL = null;
          // elimina el error si no viene el errorMessage en el payload
          state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: ( state ) => {
          state.status = 'checking';
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;