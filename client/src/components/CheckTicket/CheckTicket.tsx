import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';

export const CheckTicket = (): JSX.Element => {
  const [code, setCode] = useState('');
  const [ticket, setTicket] = useState({
    code: 0,
    created_on: '',
    ticket_type: '',
    ticket_price: 0,
    expires: '',
    user: '',
  });
  let codeIn = false;

  const checkTicket = async () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/check-ticket',
      params: { ticket_code: code },
    })
      .then(async (res) => {
        setTicket(res.data);
      })
      .catch(async (err) => {
        console.log(err);
      });
  };

  const getMessage = () => {
    var expires = new Date(ticket['expires']);

    var isValid = isBefore(Date.now(), expires);
    var validity = isValid ? 'VALID' : 'INVALID';

    if (ticket.user !== '') {
      return (
        <Typography
          color="primary.white"
          textAlign={'center'}
          p={'20px'}
          variant="h1"
        >
          TICKET IS {validity}
        </Typography>
      );
    }
  };

  useEffect(() => {}, []);

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
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={'submitButton'}
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            onClick={async () => {
              await checkTicket();
            }}
          >
            CHECK TICKET
          </Button>
        </Grid>
        <Grid item xs={12}>
          {getMessage()}
        </Grid>
      </Grid>
    </Box>
  );
};
