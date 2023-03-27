import { Box, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isBefore, format } from 'date-fns';

interface props {
  userRole: String;
}

export const Tickets = ({ userRole }: props): JSX.Element => {
  const user = '641096d20a26d93d9f562f3d';

  let noTickets;
  let isValid = false;

  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    if (userRole === 'Customer') {
      axios({
        method: 'get',
        url: 'http://localhost:3001/api/user/tickets',
        params: { user_id: user },
      })
        .then((tickets) => {
          const ticketList = tickets.data;
          setTickets(ticketList);
          noTickets = false;
        })
        .catch((err) => {
          console.log(err);
          noTickets = true;
        });
    }
  };

  useEffect(() => {
    fetchTickets();
  });

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
        {!noTickets === true ? (
          tickets.map((ticket, index) => {
            var expires = new Date(ticket['expires']);
            isValid = isBefore(Date.now(), expires);

            return (
              <Grid item xs={12} key={index}>
                <Box
                  margin="auto"
                  width="500px"
                  p={3}
                  sx={{
                    boxShadow: 3,
                    borderRadius: 8,
                    backgroundColor: '#474954',
                  }}
                >
                  <Typography
                    color="primary.main"
                    textAlign={'left'}
                    fontWeight={'1000'}
                    fontSize={'50px'}
                  >
                    {ticket['ticket_type']} : {isValid ? 'Valid' : 'Invalid'}
                  </Typography>
                  <Typography
                    color="primary.main"
                    textAlign={'left'}
                    variant="h3"
                    p={'20px'}
                  >
                    Order Date:{' '}
                    {format(new Date(ticket['created_on']), 'dd/LL/yyyy')}{' '}
                    <br />
                    Expires On: {format(expires, 'dd/LL/yyyy')} <br />
                    Ticket Code: {ticket['code']} <br />
                    Price: £{ticket['ticket_price']} <br />
                  </Typography>
                </Box>
              </Grid>
            );
          })
        ) : (
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
                No Tickets
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
