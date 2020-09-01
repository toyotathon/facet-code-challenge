import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import DashboardTable from "../components/dashboard/DashboardTable";
import { useApiContext } from "../contexts/ApiContext";
import styled from "styled-components";

const DashboardPage: FC = () => {
  const { store } = useApiContext();
  const { formData, totalAssets, totalLiabilities, netWorth } = store;
  return (
    <DashboardGrid container spacing={2}>
      <DashboardSummary
        netWorth={netWorth}
        totalAssetsAndLiabilities={formData.length}
        totalAssets={totalAssets}
        totalLiabilities={totalLiabilities}
      />
      <DashboardTable rows={formData} />
    </DashboardGrid>
  );
};

export default DashboardPage;

const DashboardGrid = styled(Grid)`
  padding-bottom: 72px;
`;
