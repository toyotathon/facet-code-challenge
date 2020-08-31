import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import DashboardTable from "../components/dashboard/DashboardTable";
import { useApiContext } from "../contexts/ApiContext";

const DashboardPage: FC = () => {
  const { store } = useApiContext();
  const { formData, totalAssets, totalLiabilities, netWorth } = store;
  return (
    <Grid container spacing={2}>
      <DashboardSummary
        netWorth={netWorth}
        totalAssetsAndLiabilities={formData.length}
        totalAssets={totalAssets}
        totalLiabilities={totalLiabilities}
      />
      <DashboardTable rows={formData} />
    </Grid>
  );
};

export default DashboardPage;
