import express from "express";
import encrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app =express();

const users= [];

app.get("/home" , (req, res)=>{
     res.status(200).send("Hii") // status code cannot be applied in the json format
});

app.post('/login', (req, res)=>{
     res.send("Logged in Successfully");
});

//This end point doesnot exist
app.get("*", (req, res)=>{
     res.status(404).send("Unknown Location"); //Here we can render single 404 error
});

app.post('/register', async(req, res)=>{

      const {email, password} = req.body;

      // To  check weather the field is empty or not
      if(!email || !password){
           res.status(404).json({
                msg: "Empty Fields"
           })
      }

     const encryptPassword= await encrypt.hash(password, 12); //new encrypted password

     users.push({
          email,
          password :encryptPassword,
     });
     

     // users.push(req.body); // push the user into the array

     res.status(201).json({
          msg:"Registered Successfully",
     });
     console.log(users);
});


app.post("/resetPassword" , async(req, res)=>{
     const {email, password, newPassword}= req.body;

     //Check if email exists\
     for (let i = 0; i < users.length; i++) {
          if (users[i].email === email) {
               if (await encrypt.compare(password, users[i].password)){
                    res.status(200).json({
                         msg: "Your Password was changed"
                    });
               }
                    else{
                         res.status(500).json({
                         msg: "Your Password dont match"
                    
               });
          }
          }          
     }
})


app.post("/login" , async(req, res)=>{
     const {email, password}= req.body;

     //Check if email exists\
     for (let i = 0; i < users.length; i++) {
          if (users[i].email === email) {
               if (await encrypt.compare(password, users[i].password)){
                    //Login Details
                    //generate a jwt and return
                    const token = jwt.sign(
                         {
                         email,  //Payload
                         },
                          "SecreteKey"    //Key
                          ,
                          {
                               expiresIn: "1d",
                          }
                    );
                    res.status(200).json({
                         msg: "Logged in successfully"
                    });
               }
                    else{
                         res.status(500).json({
                         msg: "Your Password dont match"
                    
               });
          }
          }          
     }
})
app.listen(5000);