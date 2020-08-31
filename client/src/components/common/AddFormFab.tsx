import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import {
  Fab,
  Dialog,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { FormType } from "../../types";
import { useApiContext } from "../../contexts/ApiContext";

const AddForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createForm } = useApiContext();
  const [formType, setFormType] = useState<FormType | null>(null);
  const [name, setName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const handleFormTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFormType(event.target.value as FormType),
    []
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setName(event.target.value as FormType),
    []
  );

  const handleBalanceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setBalance(Number.parseInt(event.target.value, 10)),
    []
  );
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formType != null) {
        await createForm({ formType, name, balance });
      }
      onClose();
    },
    [onClose, createForm, balance, formType, name]
  );
  return (
    <FormPaper elevation={0}>
      <Typography variant="h6">Add New Asset or Liability</Typography>
      <AddFormBase onSubmit={handleFormSubmit}>
        <FormControl required>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            name="formType"
            value={formType}
            onChange={handleFormTypeChange}
          >
            <FormControlLabel
              value={FormType.ASSET}
              control={<Radio />}
              label={FormType.ASSET}
            />
            <FormControlLabel
              value={FormType.LIABILITY}
              control={<Radio />}
              label={FormType.LIABILITY}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Balance"
          type="number"
          required
          value={balance}
          onChange={handleBalanceChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <FormControl></FormControl>
      </AddFormBase>
    </FormPaper>
  );
};

const FormPaper = styled(Paper)`
  padding: 16px;
`;

const AddFormBase = styled.form`
  display: flex;
  flex-direction: column;
  margin: 8px 0;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const AddFormFab: FC = () => {
  const [open, setOpen] = useState(true);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <AddFab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </AddFab>
      <Dialog open={open} onClose={handleClose}>
        <AddForm onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default AddFormFab;

const AddFab = styled(Fab)`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;
