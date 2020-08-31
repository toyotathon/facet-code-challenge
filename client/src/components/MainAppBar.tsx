import React, { FC } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const MainAppBar: FC = () => (
  <MainBar position="static">
    <AppToolbar>
      <Typography variant="h6"> Asset / Liability Tracker</Typography>
      <IconButton color="primary">
        <LogoutIcon color="action" />
      </IconButton>
    </AppToolbar>
  </MainBar>
);

export default MainAppBar;

const AppToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const LogoutIcon = styled(ExitToAppIcon)`
  color: #fff;
`;

const MainBar = styled(AppBar)`
  margin-bottom: 24px;
`;
