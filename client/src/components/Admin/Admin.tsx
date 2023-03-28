import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Box } from '@mui/system';
import axios from 'axios';
import { isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface props {
  userRole: String;
}

export const Admin = ({ userRole }: props): JSX.Element => {
  const [ticketNo, setTicketNo] = useState(1234);
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState<String>('');

  const createData = (
    ticket_no: number,
    ticket_type: string,
    ticket_price: string,
    validity: string,
    selected: boolean
  ) => {
    return { ticket_no, ticket_type, ticket_price, validity, selected };
  };

  const rows: {
    ticket_no: number;
    ticket_type: string;
    ticket_price: string;
    validity: string;
    selected: boolean;
  }[] = [];

  const handleSelect = (code: number) => {
    setTicketNo(code);
  };

  tickets.forEach((ticket) => {
    var expires = new Date(ticket['expires']);

    var isValid = isBefore(Date.now(), expires);
    var validity = isValid ? 'Valid' : 'Invalid';

    rows.push(
      createData(
        ticket['code'],
        ticket['ticket_type'],
        ticket['ticket_price'],
        validity,
        false
      )
    );
  });

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

  const updateTicket = () => {
    setErrors('');
    if (userRole === 'Admin') {
      axios({
        method: 'patch',
        url: 'http://localhost:3001/api/update-ticket',
        params: { ticket_code: ticketNo },
      }).catch((err) => {
        setErrors('TICKET NOT FOUND');
      });
    }
  };

  useEffect(() => {
    setErrors('');
    if (userRole === 'Admin') {
      axios({
        method: 'get',
        url: 'http://localhost:3001/api/tickets',
      })
        .then((tickets) => {
          setTickets(tickets.data);
        })
        .catch(() => {
          setErrors('NO TICKETS FOUND');
        });
    }
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
            UPDATE TICKET VALIDITY
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer
            component={Box}
            sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: '#474954' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket No</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Validity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    selected={row.selected}
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover, &:active': {
                        backgroundColor: '#45515c',
                      },
                    }}
                    onClick={() => handleSelect(row.ticket_no)}
                  >
                    <TableCell component="th" scope="row">
                      {row.ticket_no}
                    </TableCell>
                    <TableCell align="right">{row.ticket_type}</TableCell>
                    <TableCell align="right">£{row.ticket_price}</TableCell>
                    <TableCell align="right">{row.validity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={'submitButton'}
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => {
              updateTicket();
            }}
          >
            UPDATE {ticketNo}
          </Button>
        </Grid>
        <Grid item xs={12}>
          {errors !== '' && getError()}
        </Grid>
      </Grid>
    </Box>
  );
};
