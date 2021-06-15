
//                                                         Day-1

//  Fetch the weather API through the server
/*
Here we imperted 
npm init
npm i nodemon express axios dotenv 

*/


import express from "express";
import dotenv from "dotenv";
import axios from "axios"

const app = express();

dotenv.config();

app.use((req, res, next) =>{
    console.log("Before any Route");
})

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


// const port= process.env.NODE_ENV === "DEV" ?5000 :5000;

app.get("/:city", async(req, res) => {

    const city = await req.params.city;

    axios
        .get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q={city}`
        )
        .then((response) => res.json({
            data: response.data,
        }));
});

app.post ("/login",
(req, res, next) =>{
    console.log("Before Login") ,
    next()
},  
(req, res) =>{
    const {email , password}=req.body;
    res.send(`${email} and ${password}`);
})

app.listen(5000);








// Params
app.get("/weather/:cityname", (req, res) => {

    // Logic to fetch the api from external data
    const city = req.params.cityname;
    res.send(city);
})