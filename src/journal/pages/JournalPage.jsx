import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import AddOutlined from '@mui/icons-material/AddOutlined';

import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views";
import { NoteView } from "../views/NoteView";

import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
     
      {
        // si el valor es null, el valor de active es false
        // si active tiene valor active es true
        (!!active) 
          //Note view 
          ? <NoteView/>
          // Nothing selected
          : <NothingSelectedView />
      }

      <IconButton
        size='large'
        disabled={ isSaving }
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={ onClickNewNote }
      >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>

  </JournalLayout>


  )
}
