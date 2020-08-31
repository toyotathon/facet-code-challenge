import React, { FC, useCallback, useState } from "react";
import {
  TableContainer,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormType, Form } from "../../types";
import { FormatUtils } from "../../utils/format-utils";

interface DashboardTableRowProps {
  type: FormType;
  name: string;
  balance: number;
  id: number;
  onSelect: (id: number) => void;
}

const DashboardTableHead: FC = () => (
  <TableHead>
    <TableRow>
      <TableCell>
        <DeleteIcon />
      </TableCell>
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
  id,
  onSelect,
}) => (
  <TableRow>
    <TableCell padding="checkbox">
      <Checkbox onChange={() => onSelect(id)} />
    </TableCell>
    <TableCell>{type}</TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{FormatUtils.toUsdCurrency(balance)}</TableCell>
  </TableRow>
);

const DashboardTable: FC<{ rows: Form[] }> = ({ rows }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const onSelect = useCallback(
    (id: number) => {
      if (selected.includes(id)) {
        setSelected((currentSelected) =>
          currentSelected.filter((selected) => selected !== id)
        );
      } else {
        setSelected((currentSelected) => currentSelected.concat(id));
      }
    },
    [selected]
  );

  return (
    <TableContainer component={Grid} item xs={12} sm={6}>
      <Typography>Form Data</Typography>
      <Table>
        <DashboardTableHead />
        <TableBody>
          {rows.map(({ formType, name, balance, id }) => (
            <DashboardTableRow
              key={id}
              type={formType}
              name={name}
              balance={balance}
              id={id}
              onSelect={onSelect}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DashboardTable;
