import React, { Dispatch, SetStateAction, FC, useState } from "react";

interface LoggedInContextInterface {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const LoggedInContext = React.createContext({
  loggedIn: false,
  setLoggedIn: () => {},
} as LoggedInContextInterface);

export const LoggedInProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};