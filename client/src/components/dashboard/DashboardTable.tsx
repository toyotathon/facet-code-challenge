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
  Toolbar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormType, Form } from "../../types";
import { FormatUtils } from "../../utils/format-utils";
import styled from "styled-components";
import { useApiContext } from "../../contexts/ApiContext";

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
  const { deleteForms } = useApiContext();
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

  const onDeleteForms = useCallback(async () => {
    await deleteForms(selected);
    setSelected([]);
  }, [selected, deleteForms]);

  const numSelected = selected.length;

  return (
    <TableContainer component={Grid} item xs={12} sm={6}>
      <Typography variant="h6" component="div">
        Form Data
      </Typography>
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
      {numSelected > 0 && (
        <DashboardToolbar>
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton
              onClick={onDeleteForms}
              color="inherit"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </DashboardToolbar>
      )}
    </TableContainer>
  );
};
export default DashboardTable;

const DashboardToolbar = styled(Toolbar)`
  justify-content: space-between;
  color: #fff;
  background-color: rgb(170, 100, 123);
`;
