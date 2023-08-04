// redux
import { useDispatch } from 'react-redux';
// ui
import { AppBar, IconButton, Toolbar, Grid, Typography } from "@mui/material";
// Icons
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
// logout
import { startLogout } from "../../store/auth";

export const Navbar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        //console.log('Logout');
        dispatch( startLogout() );
    }

    return (
        <AppBar
            position='fixed'
            sx={{ 
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined/>
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                    <IconButton 
                        color='error'
                        onClick={onLogout}
                    >
                        <LogoutOutlined/>
                    </IconButton>
                </Grid>
            </Toolbar>

        </AppBar>
  )
}
