import React, { FC } from "react";
import { DataTable } from "grommet";
import { SalesData } from "../requests/data-service";
import { FormatUtils } from "../utils/format-utils";

interface SalesDataTableProps {
  data: SalesData[];
}

export const SalesDataTable: FC<SalesDataTableProps> = ({ data }) => (
  <DataTable
    columns={[
      {
        property: "customerName",
        header: "Customer Name",
      },
      {
        property: "itemDescription",
        header: "Item Description",
      },
      {
        property: "itemPrice",
        header: "Item Price",
        render: ({ itemPrice }) => <>{FormatUtils.toUsdCurrency(itemPrice)}</>,
      },
      {
        property: "merchantName",
        header: "Merchant Name",
      },
      {
        property: "merchantAddress",
        header: "Merchant Address",
      },
      {
        property: "quantity",
        header: "Quantity",
      },
    ]}
    data={data}
    primaryKey="id"
  />
);
