import React, { FC } from "react";
import {
  TableContainer,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { FormType, Form } from "../../types";
import { FormatUtils } from "../../utils/format-utils";

interface DashboardTableRowProps {
  type: FormType;
  name: string;
  balance: number;
}

const DashboardTableHead: FC = () => (
  <TableHead>
    <TableRow>
      <TableCell>Type</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Balance</TableCell>
    </TableRow>
  </TableHead>
);

const DashboardTableRow: FC<DashboardTableRowProps> = ({
  type,
  name,
  balance,
}) => (
  <TableRow>
    <TableCell>{type}</TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{FormatUtils.toUsdCurrency(balance)}</TableCell>
  </TableRow>
);

const DashboardTable: FC<{ rows: Form[] }> = ({ rows }) => (
  <TableContainer component={Grid} item xs={12} sm={6}>
    <Table>
      <DashboardTableHead />
      <TableBody>
        {rows.map(({ formType, name, balance, id }) => (
          <DashboardTableRow
            key={id}
            type={formType}
            name={name}
            balance={balance}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
export default DashboardTable;
