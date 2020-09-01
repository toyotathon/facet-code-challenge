import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { Fab, Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddForm from "./AddForm";
import { useApiContext } from "../../contexts/ApiContext";

const AddFormFab: FC = () => {
  const { createForm } = useApiContext();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <AddFab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </AddFab>
      <Dialog open={open} onClose={handleClose}>
        <AddForm onClose={handleClose} createForm={createForm} />
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
