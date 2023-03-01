import React, { Fragment, Suspense } from 'react';
import { LoginForm } from '../LoginForm/LoginForm'
import { Header } from '../Header/Header'
import { roles } from '../../Utils/constants';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { NotFound } from '../../pages/NotFound/NotFound';

export const App = (): JSX.Element => {
  const isAuthenticated = false;
  const role = isAuthenticated ? roles.CUSTOMER : roles.GUEST
  
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
        <Typography variant="h4" color="primary.main" mb={4}>
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
          <Route path="/" element={<Home />} />
          
  {/* if unathuorised then show the login screen */}
  {/* else use rbac to determine what content is shown */}
  <Route path="/" element={<LoginForm onSubmit={function (username: string, password: string): void {
            throw new Error('Function not implemented.');
          } } />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
  </Suspense>
  );
}
