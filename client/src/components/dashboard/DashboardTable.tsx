import React, { FC } from "react";
import styled from "styled-components";
import {
  TableContainer,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { EntryType } from "../../types";
import { FormatUtils } from "../../utils/format-utils";

interface DashboardTableRowProps {
  type: EntryType;
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

const DashboardTable: FC<{ rows: DashboardTableRowProps[] }> = ({ rows }) => (
  <TableContainer component={BaseGrid} item xs={12} sm={6}>
    <Table>
      <DashboardTableHead />
      <TableBody>
        {rows.map((row, index) => (
          <DashboardTableRow key={index} {...row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
export default DashboardTable;

const BaseGrid = styled(Grid)`
  padding: 16px;
`;
