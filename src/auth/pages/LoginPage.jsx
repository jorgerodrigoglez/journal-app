import { useMemo } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPasword } from '../../store/auth';
// react-router
import { Link as RouterLink} from 'react-router-dom';
// layout
import { Grid, TextField, Typography, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
// Icons
import Google from '@mui/icons-material/Google';
// hook
import { useForm } from '../../hooks';

const formData = {
  email: 'jrg@gmail.com',
  password: '123456'
}


export const LoginPage = () => {

  // redux
  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  // hook
  const { email, password, onInputChange } = useForm( formData );

  // useMemo - si el estatus no cambia no se vuelve a renderizar
  const isAuthenticating = useMemo( () => status === 'checking', [ status ] );

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log({ email, password });
    //dispatch( checkingAuthentication() );
    // comprueba el login de usuario autenticado
    dispatch( startLoginWithEmailPasword({ email, password }))

  }

  const onGoogleSignIn = () => {
    //console.log('on Google SignIn')
    dispatch( startGoogleSignIn() );
  }

  return (
     <AuthLayout title='Login'>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
          <Grid container>
            <Grid item xs={12} sx={{ mt:2 }} >
              <TextField
                label="Correo"
                type="email"
                placeholder='Ingresa tu correo'
                fullWidth

                name="email"
                value={ email }
                onChange={onInputChange}
              />
            </Grid>  

            <Grid item xs={ 12 } sx={{ mt:2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder='Ingresa tu contraseña'
                fullWidth

                name="password"
                value={ password }
                onChange={onInputChange}
              />

            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 1, mt: 0.5 }}>
              
              <Grid 
                item 
                xs={12} 
                display={ !!errorMessage ? '' : 'none' }
              >
                  <Alert severity='error'>{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={ isAuthenticating }

                  type="submit"
                  variant='contained' 
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={ isAuthenticating }
                  
                  variant='contained' 
                  fullWidth
                  onClick={ onGoogleSignIn }
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

  
            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>

     </AuthLayout>

   )
}
