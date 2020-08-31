import React, { FC } from "react";
import { Card, Grid, Typography, CardContent } from "@material-ui/core";

const DashboardCard: FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <Grid item xs={12} lg={6}>
    <Card variant="outlined">
      <CardContent>
        <Typography>{title}</Typography>
        <Typography>{content}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

const DashboardSummary: FC = () => (
  <Grid item xs={12} sm={6}>
    <Grid container spacing={2}>
      <DashboardCard title="Total Assets and Liabilities" content="none" />
      <DashboardCard title="Net Worth" content="none" />
      <DashboardCard title="Total Assets" content="none" />
      <DashboardCard title="Total Liabilities" content="none" />
    </Grid>
  </Grid>
);

export default DashboardSummary;
