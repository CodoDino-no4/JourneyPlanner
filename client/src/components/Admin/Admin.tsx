import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { LoginForm } from '../../components/LoginForm';

interface ComponentProps {}

export const Admin = (): JSX.Element => {
  const [ticketNo, setTicketNo] = useState('1234');
  const [selected, setSelected] = useState(false);

  function createData(name: string, calories: number, fat: number) {
    return { name, calories, fat };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
  ];

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
            sx={{ boxShadow: 3, borderRadius: 8, backgroundColor: '#474954' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Ticket No</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Validity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        color="primary"
                        checked={selected}
                        onClick={(selected) => setSelected(!selected)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
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
          >
            UPDATE {ticketNo}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
