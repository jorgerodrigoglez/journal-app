import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
      /*active: {
        id: 'Asdad',
        title: '',
        body: '',
        date: 123455
        imageUrls: [ foto1, foto2 ...]
      }*/
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },

        addNewEmptyNote : ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },

        setActiveNote : ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNotes : ( state, action ) => {
            state.notes = action.payload;
        },

        setSaving : ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateNote : ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                // nota buscada
                if( note.id === action.payload.id ) {
                    // retorno la nota que cumple la condicion
                    return action.payload
                }
                return note;
            });
            // mostrar mensaje de actualización
            state.messageSaved = `${ action.payload.title }, nota actualizada correctamente`;
        },

        setPhotosToActiveNote : ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },

        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null
        },

        deleteNoteById : ( state, action ) => {
            state.active = null
            state.notes = state.notes.filter( note => note.id !== action.payload );                       
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;