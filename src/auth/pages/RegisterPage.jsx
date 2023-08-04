import { useState, useMemo } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// react router
import { Link as RouterLink} from 'react-router-dom';
// hook
import { useForm } from '../../hooks';
// layout
import { Grid, TextField, Typography, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
// Thunks
import { startCreatingUserWithEmailPassword } from '../../store/auth';

// datos del formulario
const formData = {
  email: '',
  password: '',
  displayName: ''
}
// validaciones del formulario
const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {
    // redux
    const dispatch = useDispatch();

    // estado para que no aparezcan los mensajes de error inicialmente si los campos estan vacios
    const [formSubmited, setFormSubmited] = useState(false);

    // hook
    const { 
      formState, displayName, email, password, onInputChange,
      isFormValid, displayNameValid, emailValid, passwordValid, 
    } = useForm( formData, formValidations );

    // redux
    const { status, errorMessage } = useSelector( state => state.auth );
    // useMemo - memoriza el estado del boton con false mientras no cambie el status
    const isChekingAuthentication = useMemo( () => status === 'checking', [status] );

    const onSubmit = (e) => {
      e.preventDefault();
      //console.log({formState});
      setFormSubmited(true);

      if( !isFormValid ) return;
      // registro de usuario en firebase
      dispatch( startCreatingUserWithEmailPassword(formState));
    }

    return (
      <AuthLayout title='Crear cuenta'>

        {/*<h3>FormValid : { isFormValid ? 'Valido' : 'Invalido' }</h3>*/}

          <form onSubmit = { onSubmit } className="animate__animated animate__fadeIn animate__faster" >
            <Grid container>

              <Grid item xs={12} sx={{ mt:2 }} >
                  <TextField
                    label="Nombre"
                    type="text"
                    placeholder='Ingresa tu nombre'
                    fullWidth

                    name="displayName"
                    value={ displayName }
                    onChange={ onInputChange }
                    // false && false - !null = true / !!null = false
                    error={ !!displayNameValid && formSubmited }
                    helperText={ displayNameValid  }
                  />
              </Grid>  

              <Grid item xs={12} sx={{ mt:2 }} >
                <TextField
                  label="Correo"
                  type="email"
                  placeholder='Ingresa tu correo'
                  fullWidth

                  name="email"
                  value={ email }
                  onChange={ onInputChange }

                  error={ !!emailValid && formSubmited }
                  helperText={ emailValid  }
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
                  onChange={ onInputChange }

                  error={ !!passwordValid && formSubmited}
                  helperText={ passwordValid  }
                />

              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 1, mt: 1 }}>

                <Grid item xs={12} display={ !!errorMessage ? '' : 'none' }>
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>

                <Grid item xs={12}>
                  <Button 
                    disabled={ isChekingAuthentication }
                    variant='contained' 
                    fullWidth
                    type="submit"
                  >
                    Registrate
                  </Button>
                </Grid>
            
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿Tienes una cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                    Ingresar
                </Link>
              </Grid>

            </Grid>
          </form>

      </AuthLayout>

    )
}



