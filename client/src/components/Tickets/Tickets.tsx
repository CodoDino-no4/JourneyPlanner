import { Box, Typography, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {}

export const Tickets = (): JSX.Element => {
  const [type] = useState('Day Pass');
  const [expiryDate] = useState('21/00/00');
  const [orderDate] = useState('20/01/23');
  const [isValid] = useState(true);
  const [code] = useState('12345678');

  const [tickets, setTickets] = useState([]);

  axios.get('http://localhost:3001/api/user').then(() => {});

  const fetchTickets = () => {
    fetch('http://localhost:3001/api/user')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        console.log(data);
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
