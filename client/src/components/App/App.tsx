import React, { Fragment, Suspense } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { Header } from '../Header/Header';
import { roles } from '../../Utils/constants';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';

export const App = (): JSX.Element => {
  const isAuthenticated = false;
  const role = isAuthenticated ? roles.CUSTOMER : roles.GUEST;

  return (
    <Suspense
      fallback={
        <Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Typography variant="h4" color="primary.main">
              Loading...
            </Typography>
            <CircularProgress />
          </Grid>
        </Container>
      }
    >
      <BrowserRouter>
        <Header role={role} />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Typography
                  variant="h4"
                  color="primary.main"
                  textAlign={'center'}
                  p={'20px'}
                >
                  Welcome
                </Typography>
              ) : (
                <LoginForm isAuth={isAuthenticated} />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
          {/* Customers page for purchasing and viewing tickets */}
          <Route path="/Tickets" element={<Tickets />} />

          {/* Drivers page for inputting ticket code */}
          <Route path="/CheckTicket" element={<CheckTicket />} />

          {/* Admin page for inputting ticket code */}
          <Route path="/Admin" element={<CheckTicket />} />

          {/* if unathuorised then show the login screen */}
          {/* else use rbac to determine what content is shown */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
