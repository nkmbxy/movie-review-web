import React, { memo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const AlertDialogConfirm = ({
  openAlertDialog,
  handleOnCloseDialog,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={openAlertDialog} onClose={handleOnCloseDialog}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleOnCloseDialog}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AlertDialogConfirm);
