import React, { FC } from "react";
import { Box, Grid, Text, Heading } from "grommet";
import { FormatUtils } from "../utils/format-utils";

interface DashboardViewProp {
  totalRevenue: number;
  customerCount: number;
}

interface DashboardBoxProps {
  gridArea: string;
  title: string;
}

const DashboardBox: FC<DashboardBoxProps> = ({ children, gridArea, title }) => (
  <Box
    align="center"
    direction="column"
    background="light-2"
    gridArea={gridArea}
  >
    <Heading level={2}>{title}</Heading>
    {children}
  </Box>
);

export const DashboardView: FC<DashboardViewProp> = ({
  totalRevenue,
  customerCount,
}) => (
  <Grid
    rows={["small"]}
    columns={["medium", "medium"]}
    gap="small"
    areas={[
      { name: "revenue", start: [0, 0], end: [0, 0] },
      { name: "customers", start: [1, 0], end: [1, 0] },
    ]}
  >
    <DashboardBox gridArea="revenue" title="Revenue">
      <Text size="xlarge">{FormatUtils.toUsdCurrency(totalRevenue)}</Text>
    </DashboardBox>
    <DashboardBox gridArea="customers" title="Unique Customers">
      <Text size="xlarge">{customerCount}</Text>
    </DashboardBox>
  </Grid>
);
