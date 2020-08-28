import React, { FC, useState, useEffect } from "react";
import { SalesDataTable } from "../components/sales-data-table";
import { DataService, SalesData } from "../requests/data-service";

interface DataPageProps {
  path: string;
}

export const DataPage: FC<DataPageProps> = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    DataService.getAllUploadedData().then((response) =>
      setSalesData(response)
    );
  }, []);

  return <SalesDataTable data={salesData} />;
};
