import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import DashboardTable from "../components/dashboard/DashboardTable";
import { EntryType } from "../types";

const dashboardRows = [
  { type: EntryType.ASSET, name: "New entry", balance: 100 },
];

const DashboardPage: FC = () => {
  return (
    <Grid container spacing={5}>
      <DashboardSummary />
      <DashboardTable rows={dashboardRows} />
    </Grid>
  );
};

export default DashboardPage;
