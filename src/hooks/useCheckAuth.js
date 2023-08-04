import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth';

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {
  
    // redux - controla el inicio de carga de ui/components/CheckingAuth
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // observador de cambios de usuario autenticado de firebase
    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async (user) => {
            //console.log(user);
            if(!user) return dispatch( logout() );

            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }));
            // journal.state - store/journal/tunks
            dispatch( startLoadingNotes() );

        } );
    }, []);

  /*return {
    status
  }*/

  return status;

}
