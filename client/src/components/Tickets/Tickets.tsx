import { Box, Typography, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {}

export const Tickets = (): JSX.Element => {
  const user = '6411e785fdbe02425b93526c';
  const [type] = useState('Day Pass');
  const [expiryDate] = useState('21/00/00');
  const [orderDate] = useState('20/01/23');
  const [isValid] = useState(true);
  const [code] = useState('12345678');

  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/user',
      params: { _id: user },
    })
      .then((tickets) => {
        console.log(tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

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
            TICKETS
          </Typography>
        </Grid>
        {/*  */}
        {/* {tickets.map((ticket) => {

        })} */}
        <Grid item xs={12}>
          <Box
            margin="auto"
            width="500px"
            p={3}
            sx={{ boxShadow: 3, borderRadius: 8, backgroundColor: '#474954' }}
          >
            <Typography
              color="primary.main"
              textAlign={'left'}
              fontWeight={'1000'}
              fontSize={'50px'}
            >
              {type} : {isValid ? 'Valid' : 'Invalid'}
            </Typography>
            <Typography
              color="primary.main"
              textAlign={'left'}
              variant="h3"
              p={'20px'}
            >
              Order Date: {orderDate} <br />
              Expires On: {expiryDate} <br />
              Ticket Code: {code} <br />
            </Typography>
          </Box>
        </Grid>
        {/*  */}
      </Grid>
    </Box>
  );
};
