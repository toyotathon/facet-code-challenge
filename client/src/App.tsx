import React, { FC } from "react";
import styled from "styled-components";
import { Box, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MainAppBar from "./components/MainAppBar";
import DashboardPage from "./pages/DashboardPage";

const App: FC = () => {
  return (
    <Box>
      <MainAppBar />
      <PageBox>
        <DashboardPage />
        <AddFab color="primary" aria-label="add">
          <AddIcon />
        </AddFab>
      </PageBox>
    </Box>
  );
};

export default App;

const PageBox = styled(Box)`
  height: 100vh;
`;

const AddFab = styled(Fab)`
  position: sticky;
`;
