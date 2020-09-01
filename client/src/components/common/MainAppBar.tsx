import React, { FC } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const MainAppBar: FC = () => (
  <MainBar position="static">
    <AppToolbar>
      <Typography variant="h6"> Asset / Liability Tracker</Typography>
    </AppToolbar>
  </MainBar>
);

export default MainAppBar;

const AppToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const MainBar = styled(AppBar)`
  margin-bottom: 24px;
`;
