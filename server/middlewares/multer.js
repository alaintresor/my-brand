const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+'-'+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else{
        //reject file
        cb({message:'Unsupported file format'},false)
    }
}

const upload=multer({
    storage:storage,
    limits:{fieldSize:1024*1024},
    fileFilter:fileFilter
})

module.exports=upload;

// import cloudinary from "./cloudinary.js"


// export const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true);
//     } else {
//         cb("Invalid Image File!", false);
//     }
// };
// export const photo = async(req) => {
//     let imageUrl = "";
//     await cloudinary.v2.uploader.upload(
//         req.file.path,
//         async function(err, image) {
//             if (err) console.log(err);
//             imageUrl = image.url;
//         }
//     );
//     return imageUrl;
// };