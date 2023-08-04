import { useMemo, useEffect, useRef } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// yarn add sweetalert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
//hook
import { useForm } from '../../hooks';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
// icons
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import UploadOutline from '@mui/icons-material/UploadOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';


export const NoteView = () => {

    //redux
    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    // hook
    const { title, body, date, onInputChange, formState } = useForm( note );
    // memo - para que no cambie la fecha, si cambia el formulario
    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    // edicion (cambio los valores) de datos de la nota
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    // dispara mensaje cuando una nota ha sido editada con exito
    useEffect(() => {
        if( messageSaved.length > 1 ){
            Swal.fire('Nota actualizada', messageSaved, 'success' );
        }
    }, [messageSaved])
    
    // Guarda la nota en DB Firebase
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    // useRef - habilitar la funcionalidad del input y asociarla al icono <UploadOutline/>
    const fileInputRef = useRef();

    // Subida de imagenes
    const onFileInputChange = ({target}) => {
        //console.log( target.files );
        if( target.files === 0 ) return;
        //console.log('Subiendo archivos...');
        dispatch( startUploadingFiles( target.files ));
    }

    // borrado de nota
    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type="file"
                    ref={ fileInputRef }
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
               
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutline/>
                </IconButton>

                <Button 
                    disabled={ isSaving }
                    color="primary" 
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}

                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }

                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline/>
                    Borrar
                </Button>

            </Grid>

            {/* Image gallery */}
            <ImageGallery images={ note.imageUrls }/>

        </Grid>
    )
}