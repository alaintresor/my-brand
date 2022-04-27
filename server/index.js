const express = require("express")
const mongoose = require("mongoose") 
const { dbConnect }=require('./config/db');
const articleRouter=require('./routers/articleRouter');
const messageRouter=require('./routers/messageRouter');
const userRouter=require('./routers/userRouter');
const docsRouter=require('./documentation/index.doc');
const bodyParser=require('body-parser')
const cors=require('cors')
const fileUploader=require('express-fileupload')
const PORT=process.env.PORT || 5000;
const logger=require('./middlewares/logger');

const upload=require('./middlewares/multer')
const cloudinary=require('./config/cloudinary');
const fs = require("fs");
// new

// Connect to MongoDB database
dbConnect();

const app = express()


// parse application/x-www-form-urlencoded



//cors
app.use(cors());

app.use(express.urlencoded({extended: false}))

// app.use(logger);

app.use(fileUploader({useTempFiles:true}))

// app.use(bodyParser.urlencoded({ extended: false }));





// parse application/json
app.use(express.json());


app.get('/',(req,res)=>{
  res.json('Welcome to My brand server ').status(200)
})


app.use('/api/article',articleRouter);

app.use('/api/users',userRouter)

app.use('/api/docs',docsRouter)

app.use('/api/message',messageRouter)

app.use('/upload-images',upload.array('image'),async(req,res)=>{

  const uploader=async(path)=>await cloudinary.uploads(path,'My_brand');
  if(req.method==='POST'){
    const ulrs=[]
    const files=req.files;
    console.log(`files:${files}`)
    for(const file of files){
      const {path}=file;
      const newPath=await uploader(path)
      ulrs.push(newPath)
      fs.unlinkSync(path)
    }
    res.status(200).json({
      message: 'images uploaded successfully',
      data:ulrs
    })
  }
  else{
    res.status(405).json({
      err:`${req.method} method not allowed`
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server has started! on PORT ${PORT}`)
})



module.exports=app;