import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import React, { useState } from 'react';

interface Props {}

export const CheckTicket = (): JSX.Element => {
  const [code, setCode] = useState('');

  return (
    <Box margin="auto" maxWidth="600px" p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            color="primary.white"
            textAlign={'center'}
            p={'20px'}
            variant="h1"
          >
            CHECK TICKET VALIDITY
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter Ticket Code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={'submitButton'}
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
          >
            CHECK
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
