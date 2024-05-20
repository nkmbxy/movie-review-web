import React, { memo } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';

const AlertDialogConfirm = ({ openAlertDialog, handleOnCloseDialog, onConfirm, title, message }) => {
  return (
    <Dialog open={openAlertDialog} onClose={handleOnCloseDialog}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <Button variant="contained" color="error" onClick={handleOnCloseDialog} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AlertDialogConfirm);
