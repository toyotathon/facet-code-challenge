import React, { FC } from "react";
import styled from "styled-components";
import { Box, Heading, Button } from "grommet";
import { Sidebar } from "grommet-icons";

interface AppBarProps {
  onClickSidebarButton: () => void;
}

export const AppBar: FC<AppBarProps> = ({ onClickSidebarButton }) => {
  return (
    <Bar
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      gridArea="header"
    >
      <Heading level="3" margin="none">
        Acme Cult Hero Supplies
      </Heading>
      <Button icon={<Sidebar />} onClick={onClickSidebarButton} />
    </Bar>
  );
};

const Bar = styled(Box)`
  z-index: 1;
`;
