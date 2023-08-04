import { checkingCredentials, logout, login } from './';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
// de journalSlice
import { clearNotesLogout } from '../journal';

// cambia el state.status a 'checking'
export const checkingAuthentication = () => {
    return async ( dispatch ) => {
        // Del reducer authSlice
        dispatch( checkingCredentials() );

    }
}

// login con google
export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        // Del reducer authSlice
        dispatch( checkingCredentials() );
        // funcion de firebase/providers
        // retorna los valores de la función
        const result = await signInWithGoogle();
        //console.log({ result });
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        //delete result.ok; // elimina el ok de la respuesta
        dispatch( login( result ) );

    }
}

// submit de RegisterPage.jsx
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
         // Del reducer authSlice
         dispatch( checkingCredentials() );
         // de firebase/providers
         const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
         //console.log( resp );
         //console.log(displayName);
         if( !ok ) return dispatch( logout( {errorMessage} ) );
         // registramos la informacion en el authSlice
         dispatch( login( { uid, displayName, photoURL, email } ));
    }
}

// login de usuario registrado
export const startLoginWithEmailPasword = ({ email, password }) => {
    return async( dispatch ) => {
        // Del reducer authSlice
        dispatch( checkingCredentials() );
        // de firebase/providers
        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password });
        //console.log( {result} );

        if( !ok ) return dispatch( logout( {errorMessage} ) );
        // hacemos login en el authSlice
        dispatch( login( { uid, displayName, photoURL, email } ));
    }

}

// logout
export const startLogout = () => {
    return async( dispatch ) => {
        // realiza el logout de firebase
        await logoutFirebase();
        // limpia el state de notas al hacer logout
        dispatch( clearNotesLogout() );
        // hace el logout en el estado de la app
        dispatch( logout() )
    }
}