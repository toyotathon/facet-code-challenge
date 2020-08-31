import React, { FC } from "react";
import { Card, Grid, Typography, CardContent } from "@material-ui/core";
import { FormatUtils } from "../../utils/format-utils";

interface DashboardSummaryProps {
  totalAssetsAndLiabilities: number;
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
}

const DashboardCard: FC<{ title: string; content: string | number }> = ({
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

const DashboardSummary: FC<DashboardSummaryProps> = ({
  totalAssetsAndLiabilities,
  totalAssets,
  totalLiabilities,
  netWorth,
}) => (
  <Grid item xs={12} sm={6}>
    <Grid container spacing={2}>
      <DashboardCard
        title="Total Assets and Liabilities"
        content={totalAssetsAndLiabilities}
      />
      <DashboardCard
        title="Net Worth"
        content={FormatUtils.toUsdCurrency(netWorth)}
      />
      <DashboardCard
        title="Total Assets"
        content={FormatUtils.toUsdCurrency(totalAssets)}
      />
      <DashboardCard
        title="Total Liabilities"
        content={FormatUtils.toUsdCurrency(totalLiabilities)}
      />
    </Grid>
  </Grid>
);

export default DashboardSummary;
