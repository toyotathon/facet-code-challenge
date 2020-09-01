import React, { FC } from "react";
import { Box } from "@material-ui/core";
import MainAppBar from "./components/common/MainAppBar";
import DashboardPage from "./pages/DashboardPage";
import { ApiProvider } from "./contexts/ApiContext";
import AddFormFab from "./components/common/AddFormFab";

const App: FC = () => {
  return (
    <ApiProvider>
      <Box>
        <MainAppBar />
        <DashboardPage />
      </Box>
      <AddFormFab />
    </ApiProvider>
  );
};

export default App;
