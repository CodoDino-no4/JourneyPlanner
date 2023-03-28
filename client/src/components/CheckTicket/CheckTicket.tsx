import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  AlertTitle,
} from '@mui/material';
import axios from 'axios';
import { isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface props {
  userRole: String;
}

export const CheckTicket = ({ userRole }: props): JSX.Element => {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<String>('');
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
    setErrors('');
    if (userRole === 'Driver') {
      axios({
        method: 'get',
        url: 'http://localhost:3001/api/check-ticket',
        params: { ticket_code: code },
      })
        .then(async (res) => {
          setTicket(res.data);
        })
        .catch(async () => {
          setErrors('TICKET CODE NOT FOUND');
        });
    }
  };

  const getError = () => {
    return (
      <Alert
        severity="error"
        sx={{
          mt: 2,
          bgcolor: '#160B0B',
          color: '#F4C7C7',
          textAlign: 'left',
        }}
      >
        <AlertTitle className="alert-msg" sx={{ fontWeight: '600' }}>
          {errors}
        </AlertTitle>
      </Alert>
    );
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
            className="code-input"
            label="Enter Ticket Code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className="submitButton"
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
          {errors !== '' ? getError() : getMessage()}
        </Grid>
      </Grid>
    </Box>
  );
};
