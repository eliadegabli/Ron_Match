import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({userID,deleteUser}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>מחק</Button>
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"מחיקת לקוח"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">האם אתה בטוח?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="error" autoFocus onClick={() =>  deleteUser(userID,handleClose)}>מחק</Button>
            <Button onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
