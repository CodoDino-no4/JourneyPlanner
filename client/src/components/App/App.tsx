import React, { Fragment, Suspense } from 'react';
import { LoginForm } from '../LoginForm';
import { Header } from '../Header';
import { roles } from '../../Utils/constants';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { Tickets } from '../Tickets';
import { CheckTicket } from '../CheckTicket';
import { Admin } from '../Admin';

export const App = (): JSX.Element => {
  const isAuthenticated = true;
  const role = isAuthenticated ? roles.ADMIN : roles.GUEST;

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
                  WELCOME, {role.toUpperCase()}
                </Typography>
              ) : (
                <LoginForm isAuth={isAuthenticated} />
              )
            }
          />
          <Route
            path="/logout"
            element={<LoginForm isAuth={isAuthenticated} />}
          />
          <Route path="*" element={<NotFound />} />
          {/* Customers page for purchasing and viewing tickets */}
          {/* <Route
            path="/tickets"
            element={role === roles.CUSTOMER ? <Tickets /> : <NotFound />}
          /> */}

          {/* Drivers page for inputting ticket code */}
          {/* <Route path="/tickets" element={role === roles.DRIVER ? <CheckTicket /> : <NotFound/>}/> */}

          {/* Admin page for inputting ticket code */}
          <Route
            path="/admin"
            element={role === roles.ADMIN ? <Admin /> : <NotFound />}
          />

          {/* if unathuorised then show the login screen */}
          {/* else use rbac to determine what content is shown */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
