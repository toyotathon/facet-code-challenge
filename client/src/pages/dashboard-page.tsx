import React, { FC, useState, useEffect } from "react";
import { DashboardView } from "../components/dashboard-view";
import { DashboardData, DashboardService } from "../requests/dashboard-service";
import { Box } from "grommet";

interface DashboardPageProps {
  path: string;
}

export const DashboardPage: FC<DashboardPageProps> = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  useEffect(() => {
    DashboardService.getDashboardData().then((response) =>
      setDashboardData(response)
    );
  }, []);

  return (
    <Box fill justify="center" align="center">
      {dashboardData && (
        <DashboardView
          totalRevenue={dashboardData.totalRevenue}
          customerCount={dashboardData.customerCount}
        />
      )}
    </Box>
  );
};
