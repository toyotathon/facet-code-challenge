import React, { useState, useCallback, useContext, useEffect } from "react";
import { Grommet, Grid, Box } from "grommet";
import { grommet } from "grommet/themes";
import { AppBar } from "./components/app-bar";
import { AppSidebar } from "./components/app-side-bar";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Router, navigate } from "@reach/router";
import { DashboardPage } from "./pages/dashboard-page";
import { DataPage } from "./pages/data-page";
import { UploadPage } from "./pages/upload-page";
import { LoggedInContext } from "./contexts/logged-in-context";
import { LoginPage } from "./pages/login-page";

function App() {
  const [{ token }] = useCookies(["token"]);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const [sidebar, setSidebar] = useState(true);
  const handleClickSidebarButton = useCallback(() => setSidebar(!sidebar), [
    sidebar,
  ]);

  useEffect(() => {
    if (!!token) {
      setLoggedIn(true);
      navigate("/dashboard");
    }
  }, [token, setLoggedIn]);

  useEffect(() => {
    if (!token && !loggedIn) {
      navigate("/");
    }
  }, [token, loggedIn]);

  return (
    <Grommet theme={grommet}>
      {!loggedIn ? (
        <StyledRouter>
          <LoginPage path="/" />
        </StyledRouter>
      ) : (
        <StyledGrid
          fill
          rows={["auto", "flex"]}
          columns={["xsmall", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "sidebar", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] },
          ]}
        >
          <AppBar onClickSidebarButton={handleClickSidebarButton} />
          {sidebar && <AppSidebar />}
          <Box fill={true} gridArea="main">
            <StyledRouter>
              <DashboardPage path="/dashboard" />
              <DataPage path="/data" />
              <UploadPage path="/upload" />
            </StyledRouter>
          </Box>
        </StyledGrid>
      )}
    </Grommet>
  );
}

export default App;

const StyledGrid = styled(Grid)`
  height: 100vh;
`;

const StyledRouter = styled(Router)`
  height: 100%;
  width: 100%;
`;
