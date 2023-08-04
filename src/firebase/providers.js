import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

// esta función es llamada en store/auth/trunks
export const signInWithGoogle = async() => {
    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        //console.log({ credentials });

        const { displayName, email, photoURL, uid } = result.user;
        //console.log({user});

        return {
            ok: true,
            // user info
            displayName, 
            email, 
            photoURL, 
            uid
        }

    } catch (error) {
        //console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

// regitro de usuario
export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        //console.log( resp );

        // actualiza el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true, 
            uid, 
            email, 
            photoURL, 
            displayName
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage : error.message
        }
    }
}

// comprobar que el usuario esta logeado en firebase db
export const loginWithEmailPassword = async({ email, password }) => {
    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth,email,password );
        //console.log(resp);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true, 
            uid, 
            photoURL,
            displayName,
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage : error.message
        }
    }

}

// realizar el logout de firebase
export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}