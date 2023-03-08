import { Box, Typography, Button, Grid } from '@mui/material';
import React, { useState } from 'react';

interface Props {}

export const Tickets = (): JSX.Element => {
  const [type] = useState('Day Pass');
  const [orderNo] = useState('#0013');
  const [orderDate] = useState('20/01/23');
  const [isValid] = useState(true);
  const [code] = useState('12345678');

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
              Order No: {orderNo} <br />
              Order Date: {orderDate} <br />
              Ticket Code: {code} <br />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            margin="auto"
            width="500px"
            p={3}
            sx={{
              boxShadow: 3,
              borderRadius: 8,
              backgroundColor: '#474954',
              opacity: 0.5,
            }}
          >
            <Typography
              color="primary.main"
              textAlign={'left'}
              fontWeight={'1000'}
              fontSize={'50px'}
            >
              {type} : Invalid
            </Typography>
            <Typography
              color="primary.main"
              textAlign={'left'}
              variant="h3"
              p={'20px'}
            >
              Order No: #0014 <br />
              Order Date: 16/04/22 <br />
              Ticket Code: 123444 <br />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
