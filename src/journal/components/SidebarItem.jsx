import { useMemo } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { ListItem, ListItemText, ListItemButton, ListItemIcon, Grid } from '@mui/material';
// Icons
import TurnedInNot from '@mui/icons-material/TurnedInNot';
import { setActiveNote } from '../../store/journal';

export const SidebarItem = ({ title = '' , body, id, date, imageUrls }) => {

    const dispatch = useDispatch();

    // activar nota
    const onClickNote = () => {
        dispatch( setActiveNote( { title, body, id, date, imageUrls }) );
    }

    const newTitle = useMemo(() => {
        return title.length > 17
                    ? title.substring( 0, 17 ) + '...'
                    : title
    },[title]);


    return (

        <ListItem disablePadding>

            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body  } />
                </Grid>
            </ListItemButton>
        
        </ListItem>
    )
}
