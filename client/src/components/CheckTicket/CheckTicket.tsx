import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Props {}

export const CheckTicket = (): JSX.Element => {
  const [code, setCode] = useState('');

  const checkTicket = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/check-validity',
      params: { ticket_code: code },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            onClick={() => checkTicket()}
          >
            CHECK
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
