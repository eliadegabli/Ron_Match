import React, { useEffect, useState } from "react"; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function FormDialog({Email,updateUser}) {
  const [open, setOpen] = React.useState(false);
  const [Phone,setPhone] = useState('');
  const [FirstName,setFirstName] = useState('');
  const [LastName,setLastName] = useState('');
  const [BirthDate,setBirthDate] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div dir="rtl">
      <Button variant="outlined" color="success" onClick={handleClickOpen}>עדכון מועמד</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="right">עדכון מועמד</DialogTitle>
        <DialogContent>
          <Container maxWidth="md">
          <Grid container spacing={3} dir="rtl">
            <Grid item xs={12}>
              <Input
                autoFocus
                id="Phone"
                name="Phone"
                placeholder="מס' טלפון"
                type="text"
                variant="standard"
                onChange={(e) => {
                    setPhone(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                id="FirsName"
                name="FName"
                placeholder="שם פרטי"
                type="text"
                variant="standard"
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                id="LastName"
                name="LName"
                placeholder="שם משפחה"
                type="text"
                variant="standard"
                onChange={(e) => {
                    setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item  xs={3}>תאריך לידה </Grid>
            <Grid item xs={9}>      
              <Input
                id="BirthDate"
                name="Bdate"
                type="date"
                variant="standard"
                onChange={(e) => {
                    setBirthDate(e.target.value);
                }}
              />
            </Grid>    
          </Grid>
        </Container>
        </DialogContent>
        <DialogActions  sx={{ justifyContent: 'left' }}>
            <Button variant="contained" onClick={handleClose}>סגור</Button>
            <Button variant="contained" onClick={() =>  updateUser(Email,Phone,FirstName,LastName,BirthDate,handleClose)}>עדכן</Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}