const express = require("express")
const mongoose = require("mongoose") 
const { dbConnect }=require('./config/db');
const articleRouter=require('./routers/articleRouter');
const userRouter=require('./routers/userRouter');
const bodyParser=require('body-parser')
const cors=require('cors')
// new

// Connect to MongoDB database
dbConnect();

const app = express()

const PORT=process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//cors
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server has started! on PORT ${PORT}`)
})

app.get('/',(req,res)=>{
    res.json('Welcome to My brand server ').status(200)
})

app.use('/article',articleRouter);

app.use('/api/users',userRouter)