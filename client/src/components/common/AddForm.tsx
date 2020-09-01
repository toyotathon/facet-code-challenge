import React, { FC, useState, useCallback } from "react";
import { useApiContext } from "../../contexts/ApiContext";
import { FormType } from "../../types";
import {
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import styled from "styled-components";

const AddForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createForm } = useApiContext();
  const [formType, setFormType] = useState<FormType | null>(null);
  const [name, setName] = useState<string>("");
  const [balance, setBalance] = useState<number | string>("");

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
      setBalance(Number.parseFloat(event.target.value) || ""),
    []
  );
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formType != null && balance !== "" && balance > 0 && name !== "") {
        await createForm({ formType, name, balance: balance as number });
      }
      onClose();
    },
    [onClose, createForm, balance, formType, name]
  );
  console.log(balance);

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

export default AddForm;

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
