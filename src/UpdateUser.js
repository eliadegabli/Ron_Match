import React, { useState } from "react"; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';
import moment from 'moment';
import UploadImg from "./UploadImg";
import Axios from "axios";
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({email,phone,firstName,lastName,birthDate,userID,age,updateUser}) {
  const txtUpdate = "עדכון";
  const [open, setOpen] = React.useState(false);
  const [UserID,setUserID] = useState('');
  const [Phone,setPhone] = useState('');
  const [FirstName,setFirstName] = useState('');
  const [LastName,setLastName] = useState('');
  const [BirthDate,setBirthDate] = useState('');
  const [Age,setAge] = useState('');  

  const [Service,setService] = useState('');
  const [ServiceDetails,setServiceDetails] = useState('');
  const [Education,setEducation] = useState('');
  const [Employment,setEmployment] = useState('');
  const [Characters,setCharacters] = useState('');
  const [Hobbies,setHobbies] = useState('');
  const [Goals,setGoals] = useState('');

  const [UsersListDetails,setUsersListDetails] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    setUserID(userID);
    getUserDetails(userID);
    setPhone(phone);
    setFirstName(firstName);
    setLastName(lastName);
    if(moment(birthDate).isValid()){
        birthDate = format(new Date(birthDate), 'yyyy-MM-dd');   
    }
    setBirthDate(birthDate);
    setAge(age);
  };

  const getUserDetails = (userID) => {
    Axios.put("https://eliadherokuapp.herokuapp.com/api/getDetails", {
      UserID: userID
      }).then((response) => {
        response.data.map((det)=>{
            setService(det.Service);
            setEducation(det.Education);
            setEmployment(det.Employment);
            setCharacters(det.Characters);
            setHobbies(det.Hobbies);
            setGoals(det.Goals);
        })
    })
  };  

  const ltrTheme = createTheme({ direction: "ltr" });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>עדכון</Button>
      <Dialog theme={ltrTheme}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',bgcolor:'#1f205c' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {txtUpdate}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
            <Container maxWidth="lg">
                <Grid item xs={12} align="right">
                    <h2>פרטים אישיים</h2>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} align="center">
                        <TextField
                            fullWidth
                            id="FirstName"
                            name="FName"
                            label="שם פרטי"
                            type="text"
                            variant="outlined"
                            value={FirstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <TextField
                            fullWidth
                            id="LastName"
                            name="LName"
                            label="שם משפחה"
                            type="text"
                            variant="outlined"
                            value={LastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <TextField label="סלולרי" variant="outlined"
                            fullWidth
                            id="Phone"
                            name="Phone"
                            type="text"
                            value={Phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                        }}/>
                    </Grid>
                    <Grid item xs={2} align="center">      
                        <TextField
                            fullWidth
                            id="Age"
                            name="Age"
                            label="גיל"
                            type="text"
                            variant="outlined"
                            value={Age}
                            onChange={(e) => {
                                setAge(e.target.value);
                            }}
                        />
                    </Grid> 
                    <Grid item xs={4} align="center">      
                        <TextField
                            fullWidth
                            id="BirthDate"
                            name="Bdate"
                            type="date"
                            label="תאריך לידה"
                            variant="outlined"
                            value={BirthDate}
                            onChange={(e) => {
                                setBirthDate(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">      
                        <UploadImg
                            userID={UserID}
                        >  
                        </UploadImg>
                    </Grid>  
                </Grid>
            </Container>
            <Container maxWidth="lg">
                <Grid item xs={12} align="right">
                    <h2>פרטים נוספים</h2>
                </Grid>
                <Grid container spacing={12}>
                    <Grid item xs={12} align="center">
                        <TextField
                            fullWidth
                            id="Service"
                            name="Service"
                            label="שירות צבאי"
                            type="text"
                            variant="outlined"
                            value={Service}
                            onChange={(e) => {
                                setService(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            fullWidth
                            id="Employment"
                            name="Employment"
                            label="עיסוק"
                            type="text"
                            variant="outlined"
                            value={Employment}
                            onChange={(e) => {
                                setEmployment(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            fullWidth
                            id="Education"
                            name="Education"
                            label="השכלה"
                            type="text"
                            variant="outlined"
                            value={Education}
                            onChange={(e) => {
                                setEducation(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            fullWidth
                            id="Characters"
                            name="Characters"
                            label="אופי"
                            type="text"
                            variant="outlined"
                            value={Characters}
                            onChange={(e) => {
                                setCharacters(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            fullWidth
                            id="Hobbies"
                            name="Hobbies"
                            label="תחביבים"
                            type="text"
                            variant="outlined"
                            value={Hobbies}
                            onChange={(e) => {
                                setHobbies(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            fullWidth
                            id="Goals"
                            name="Goals"
                            label="שאיפות"
                            type="text"
                            variant="outlined"
                            value={Goals}
                            onChange={(e) => {
                                setGoals(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </DialogContent>
        <DialogActions 
            sx={{bgcolor: '#1f205c'}} 
            >
            <Container maxWidth="lg">
                <Grid container spacing={2} >
                    <Grid item xs={6} align="left">    
                        <Button variant="contained" onClick={() =>  updateUser(userID,email,Phone,FirstName,LastName,BirthDate,Age,Service,Goals,Hobbies,Characters,Employment,Education,handleClose)}>עדכן</Button> 
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Button variant="contained" onClick={handleClose}>סגור</Button>
                    </Grid>
                </Grid>
            </Container>
        </DialogActions>
      </Dialog>
    </div>
  );
}
