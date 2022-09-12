require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path'); 
const mysql = require("mysql"); 
//const upload = require('file-upload/multer');
const router = express.Router();

const port  =  process.env.NODE_ENV || 5000;
//const singleUpload = upload.single('image')

const db = mysql.createPool({
    host: process.env.REACT_APP_HOST_AWS_SQL,
    user: process.env.REACT_APP_USER_AWS_SQL,
    password: process.env.REACT_APP_PASSWORD_AWS_SQL,
    database: process.env.REACT_APP_DATABASE_AWS_SQL,
    PORT: 3306
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static('build'));
    app.get('/', (req,res) => {
        req.sendFile(path.join(__dirname+'/index.html'));
    })

    app.get("/api/get", (req,res) =>{
        const sqlSelect = "Select * From users;"
        db.query(sqlSelect, (err,result) =>{
            res.send(result);  
            console.log("ddd = " + err)   
            console.log("ddd = " + process.env.REACT_APP_API_URL)
        });
    });
    
    app.put("/api/getDetails", (req,res) =>{
        const sqlSelect = "Select * From user_details where User_ID=?;"
        db.query(sqlSelect, req.body.UserID ,(err,result) =>{
            res.send(result);     
        });
    }); 

    app.post("/api/insert",(req,res)=>{
        const Email = req.body.Email;
        const Phone = req.body.Phone;
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const BirthDate = req.body.BirthDate;
        const Age = req.body.Age;

        const sqlInsert = "Insert Into users (Email,Phone,First_Name,Last_Name,Birth_Date,Age) Values (?,?,?,?,?,?);"
        db.query(sqlInsert, [Email,Phone,FirstName,LastName,BirthDate,Age] ,(err,result) =>{
            res.send(result);
            console.log(result);   
            console.log("err="+err);   
        });
    });
    
    app.put("/api/update",(req,res)=>{
        const UserID = req.body.UserID;
        const Email = req.body.Email;
        const Phone = req.body.Phone;
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const BirthDate = req.body.BirthDate;
        const Age = req.body.Age;

        const sqlUpdate = "Update users set Phone=?,First_Name=?,Last_Name=?,Birth_Date=?,Email=?,Age=? Where User_ID=?;"
        db.query(sqlUpdate, [Phone,FirstName,LastName,BirthDate,Email,Age,UserID] ,(err,result) =>{
            const sqlSelect = "Select * From users;"
            db.query(sqlSelect, (err,result) =>{
                res.send(result);       
            });          
        });
    });

    /*router.post('/api/image-upload', function(req, res) {
        singleUpload(req, res, function(err, some) {
          if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
          }
      
          return res.json({'imageUrl': req.file.location});
        });
      })*/

    app.post("/api/upsertDetails",(req,res)=>{
        const UserID = req.body.UserID;
        const Service = req.body.Service;
        const Education = req.body.Education;
        const Employment = req.body.Employment;
        const Characters = req.body.Characters;
        const Hobbies = req.body.Hobbies;
        const Goals = req.body.Goals;

        let sqlUpdate = "Insert Into user_details (User_ID,Service,Goals,Hobbies,Characters,Employment,Education) Values (?,?,?,?,?,?,?) "
        sqlUpdate = sqlUpdate + "ON DUPLICATE KEY UPDATE Service=?,Goals=?,Hobbies=?,Characters=?,Employment=?,Education=?"
        db.query(sqlUpdate, [UserID,Service,Goals,Hobbies,Characters,Employment,Education,Service,Goals,Hobbies,Characters,Employment,Education] ,(err,result) =>{
            console.log(result); 
            res.send(result);       
        });
    });

    app.post("/api/delete", (req,res) =>{
        const UserID = req.body.UserID
        const sqlDelete = "delete from users where User_ID=?;"
        db.query(sqlDelete, UserID, (err,result) =>{
            console.log(err); 
            res.send(result);        
        });
    }); 

    app.post("/api/saveImage", (req,res) =>{
        const image = req.body.images
        res.send(image);
    }); 
}

app.listen(port, (err)=>{
    if(err) return  console.log(err);
    console.log('server runing on port:', port);
})

/*module.exports = router;*/