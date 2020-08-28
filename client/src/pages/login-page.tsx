import React, { FC, useState, useCallback, useContext } from "react";
import { Box, Heading, Form, FormField, TextInput, Button } from "grommet";
import styled from "styled-components";
import { LoggedInContext } from "../contexts/logged-in-context";
import { navigate } from "@reach/router";
import { AuthService, LoginRequest } from "../requests/auth-service";

interface LoginPageProps {
  path: string;
}

export const LoginPage: FC<LoginPageProps> = () => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const [error, setError] = useState(false);
  const [value, setValue] = useState({} as LoginRequest);

  const handleLoginSubmit = useCallback(async () => {
    try {
      await AuthService.sendLoginRequest(value);
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }, [value, setLoggedIn]);

  return (
    <StyledBox fill justify="center" align="center" background="brand">
      <Heading level={1}>Sales Admin Login</Heading>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onSubmit={handleLoginSubmit}
      >
        <FormField name="userName" label="Username">
          <TextInput name="userName" />
        </FormField>
        <FormField name="password" label="Password">
          <TextInput name="password" type="password" />
        </FormField>
        <Box margin={{ top: "medium" }} direction="row" justify="center">
          <Button type="submit" primary label="Submit" />
        </Box>
      </Form>
      {error && (
        <Heading level={3} color="status-error">
          Log in failed, please try again.
        </Heading>
      )}
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  height: 100vh;
`;
