import React from "react";
import { LoginForm } from "../../components/LoginForm";

interface Props {
}

export const Home = (): JSX.Element => {

  return (
    //<Header />
    // switch out the diffeerent components depending on the user
        <>
      <LoginForm onSubmit={function (username: string, password: string): void {
        throw new Error("Function not implemented.");
      } } /><div></div></>
  );
};