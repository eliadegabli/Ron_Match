import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import UpdateUser from "./UpdateUser";
import Validation from "./Validation"; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import { set } from "date-fns";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function UserCard() {
  const [UserID,setUserID] = useState('');
  const [Email,setEmail] = useState('');
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

  const [UsersList,setUsersList] = useState([]);
  const [UsersListDetails,setUsersListDetails] = useState([]);

  useEffect(()=>{
    Axios.get("https://eliadherokuapp.herokuapp.com/api/get").then((response) => {
      setUsersList(response.data);
      console.log(response.data);
    })    
  }, [])

  const submitUser = (e) => {
    e.preventDefault();
    Axios.post("https://eliadherokuapp.herokuapp.com/api/insert", {
      Email:Email,
      Phone:Phone,
      FirstName:FirstName,
      LastName:LastName,
      BirthDate:BirthDate,
      Age:Age
    }).then((response) => {
      setUserID(response.data.insertId);
      setUsersList([
        ...UsersList,
        {User_ID: response.data.insertId,First_Name: FirstName,Last_Name: LastName,Phone: Phone,Email : Email,Birth_Date: BirthDate,Age: Age},
      ]);
      setEmail("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setBirthDate("");
      setAge("");
    })
  };

  const updateUser = (userID,email,phone,firsName,lastName,birthDate,age,service,goals,hobbies,characters,employment,education,bClose) => {
    Axios.put("https://eliadherokuapp.herokuapp.com/api/update", {
      UserID:userID,
      Email:email,
      Phone:phone,
      FirstName:firsName,
      LastName:lastName,
      BirthDate:birthDate,
      Age:age
    }).then((response) => {
      setUsersList(response.data);
      bClose();
    }); 

    Axios.post("https://eliadherokuapp.herokuapp.com/api/upsertDetails", {
      UserID:userID,
      Service:service,
      Goals:goals,
      Hobbies:hobbies,
      Characters:characters,
      Employment:employment,
      Education:education
    }).then((response) => {
      setUsersListDetails([
        ...UsersListDetails,
        {User_ID: UserID,Service: Service,Goals: Goals,Hobbies: Hobbies,Characters : Characters,Employment: Employment,Education: Education},
      ]);
    }); 
  };

  

  const deleteUser = (userID,bClose) => {

    Axios.post("https://ronmatch.herokuapp.com/api/delete", {
      UserID:userID
    }).then(()=> {
        setUsersList(UsersList.filter(item => item.User_ID !== userID));
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" sx={{ bgcolor: "#1f205c" }}>
        <Toolbar>
          <JoinInnerIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="aliceblue" noWrap>
            RonMatch
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 5,
            pb: 2,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Ron Match
            </Typography>
            <Typography variant="h4" align="center" color="text.secondary" paragraph>
              
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Input 
                        type="text" 
                        name="Email" 
                        placeholder="אימייל"
                        dir="rtl"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={Email}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input 
                        type="text" 
                        name="Phone" 
                        placeholder="מס' טלפון"
                        dir="rtl"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        value={Phone} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input 
                        type="text" 
                        name="FName" 
                        placeholder="שם פרטי"
                        dir="rtl"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        value={FirstName} 
                        />  
                    </Grid>
                    <Grid item xs={4}>
                        <Input 
                        type="text" 
                        name="LName" 
                        placeholder="שם משפחה"
                        dir="rtl"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        value={LastName} 
                        />                
                    </Grid>
                    {/*
                    <Grid item xs={4}>
                      <Input 
                        type="Date"
                        name="Bdate" 
                        dir="rtl"
                        onChange={(e) => {
                            setBirthDate(e.target.value);
                        }}
                        value={BirthDate} 
                        />           
                    </Grid>
                    */}
                    <Grid item xs={4}>
                        <Input 
                        type="text"
                        name="Age" 
                        placeholder="גיל"
                        dir="rtl"
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                        value={Age} 
                        />                
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained"  onClick={(e) => submitUser(e)}>הוספת מועמד</Button>
                    </Grid>
                </Grid>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3} >
            {UsersList.map((card) => (
              <Grid item key={card.User_ID} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '25px',
                      bgcolor: '#f6f6f6',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.First_Name + " " + card.Last_Name}
                    </Typography>
                    <Typography>
                      {}
                    </Typography>
                    <Typography>
                      {card.Phone}
                    </Typography>
                    {/*<Typography>
                      {new Date(card.Birth_Date).toLocaleDateString()}
                    </Typography>*/}
                    <Typography>
                      {card.Age}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid item xs={6} align="right">
                      <UpdateUser 
                        email={card.Email} 
                        phone={card.Phone} 
                        firstName={card.First_Name} 
                        lastName={card.Last_Name} 
                        birthDate={new Date(card.Birth_Date).toLocaleDateString()} 
                        userID={card.User_ID} 
                        age={card.Age}
                        updateUser={updateUser}>
                      </UpdateUser>
                    </Grid>
                    <Grid item xs={6} align="left">
                      <Validation 
                        userID={card.User_ID}
                        deleteUser={deleteUser}>    
                      </Validation>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}