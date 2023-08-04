import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';
// hook firebase 
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  // mantiene el estado de autenticación en firebase y observa los camocios en el usuario autenticado
  const status = useCheckAuth();
  
  // muestra el icono de carga
  if ( status === 'checking' ) {
      return <CheckingAuth/>
  }

  return (
    <Routes>
      {
        ( status === 'authenticated' )
          ? <Route path="/*" element={ <JournalRoutes />} />
          : <Route path="/auth/*" element={ <AuthRoutes />}/>
      }
        {/* ruta que solo existe si el usuario de firebase no esta autenticad */}
        <Route path="/*" element={ <Navigate to="/auth/login" /> } />

        {/* Login y registro --
        <Route path="/auth/*" element={ <AuthRoutes />}/>*/}

        {/* JournalApp --
        <Route path="/*" element={ <JournalRoutes />} />*/}

    </Routes>
  )
}
