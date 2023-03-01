import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" style={{ color: '#FA8072' }}>
        404 Error
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        Page Not Found
      </Typography>

      <Link to="/" style={{ textDecoration: 'none', marginTop: 8 }}>
        <Button variant="contained" sx={{ fontWeight: 600 }}>
          Return to home
        </Button>
      </Link>
    </Box>
  );
};
