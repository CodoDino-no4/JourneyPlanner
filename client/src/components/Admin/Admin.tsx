import {
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

export const Admin = (): JSX.Element => {
  const [ticketNo, setTicketNo] = useState(1234);
  // const [selected, setSelected] = useState(false);
  const [tickets, setTickets] = useState([]);

  const createData = (
    ticket_no: number,
    ticket_type: string,
    validity: string,
    selected: boolean
  ) => {
    return { ticket_no, ticket_type, validity, selected };
  };

  const handleSelect = (code: number) => {
    setTicketNo(code);
  };

  const rows: {
    ticket_no: number;
    ticket_type: string;
    validity: string;
    selected: boolean;
  }[] = [];

  tickets.forEach((ticket) => {
    var expires = new Date(ticket['expires']);

    var isValid = isBefore(Date.now(), expires);
    var validity = isValid ? 'Valid' : 'Invalid';

    rows.push(
      createData(ticket['code'], ticket['ticket_type'], validity, false)
    );
  });

  const updateTicket = () => {
    axios({
      method: 'patch',
      url: 'http://localhost:3001/api/update-ticket',
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    axios({ method: 'get', url: 'http://localhost:3001/api/tickets' })
      .then((tickets) => {
        setTickets(tickets.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            onSubmit={() => {
              updateTicket();
            }}
          >
            UPDATE {ticketNo}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
