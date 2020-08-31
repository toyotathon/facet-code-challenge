import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { Fab, Dialog, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const AddForm: FC = () => {
  return (
    <FormPaper elevation={0}>
      <Typography variant="h5">Add New Asset or Liability</Typography>
    </FormPaper>
  );
};

const FormPaper = styled(Paper)`
  height: 400px;
  width: 300px;
  padding: 16px;
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
        <AddForm />
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
