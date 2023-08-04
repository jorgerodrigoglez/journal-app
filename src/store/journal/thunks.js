import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './';
// trae la coleccion de la BD Firestore
import { loadNotes } from '../../helpers/loadNotes';
// helper para la suida de imagenes
import { fileUpload } from '../../helpers/fileUpload';

// gravar notas en DB firestore
export const startNewNote = () => {

    return async( dispatch, getState ) => {

        // desabilita el boton de crear nota - con disabled - true o false
        dispatch( savingNewNote() );
        //console.log('Start NewNote');
        // uid del usuario
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`) );
        await setDoc( newDoc, newNote );
        //console.log({ newDoc });

        newNote.id = newDoc.id;

        // dispatch( newNote ) - añade la nota al state.notes
        dispatch(addNewEmptyNote( newNote ) );
        // dispath( activeNote ) - activa la nota actual
        dispatch( setActiveNote( newNote ) );
    }
}

// traer notas de DB Firestore
export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {

          // uid del usuario
          const { uid } = getState().auth;
          //console.log( {uid} );
          if( !uid ) throw new Error('El UID del usuario no existe');
          // helper
          const notes = await loadNotes( uid );
          // cambiar el state de notes : [] con los notes que retorna loadNotes
          dispatch( setNotes( notes ) );
    }
}

// guardar la nota editada - con el boton de guardar del NoteView
export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        // estado de carga
        dispatch( setSaving() );

        // uid del usuario
        const { uid } = getState().auth;
        // nota activa
        const { active:note } = getState().journal;
        // eliminar el id de la nota
        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        //console.log( noteToFireStore );

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteToFireStore, { merge:true });

        // refresca las notas del state de notas
        dispatch( updateNote( note ) ); // es la nota con el id

    }
}

// subir imagenes seleccionadas a cloudinary
export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        // estado de carga
        dispatch( setSaving() );
        //console.log( files );
        //await fileUpload( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        //console.log( photosUrls );
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

// borrar una nota activada
export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        //console.log( { uid, note } );

        // Borrado de la BBDD
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc( docRef );

        // Borrado del state
        dispatch( deleteNoteById( note.id ) );

    }
}