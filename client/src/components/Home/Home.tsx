import { Typography } from '@mui/material';

interface props {
  userRole: String;
}

export const Home = ({ userRole }: props): JSX.Element => {
  return (
    <Typography
      variant="h4"
      color="primary.main"
      textAlign={'center'}
      p={'20px'}
    >
      WELCOME, {userRole.toUpperCase()}
    </Typography>
  );
};
