import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  ComponentsProps,
} from "@mui/material";

interface ComponentProps {
  onSubmit: (username: string, password: string) => void; 
}

export const LoginForm = ({ onSubmit }: ComponentProps): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Box p={3}>
      <form className={"form"} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={"submitButton"}
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};