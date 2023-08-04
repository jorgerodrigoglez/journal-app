import { Grid, Typography } from "@mui/material";
// Icons
import StarOutline from '@mui/icons-material/StarOutline';

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0} 
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 60px)', backgroundColor: 'primary.main' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
        <Grid item xs={ 12 }>
            <StarOutline sx={{ fontSize: 100, color: 'white' }} />
        </Grid>
        <Grid item xs={ 12 }>
            <Typography color="white" variant='h5'>Selecciona o crea una entrada</Typography>
        </Grid>

    </Grid>
  )
}