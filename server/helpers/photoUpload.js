const uploader=require('../config/cloudinary');


// const blogImage=async req =>{
// const tmp=req.files.image.tempFilePath;
// const result= await uploader.upload(tmp,
//     {folder:"My Brand"},
//     (_,result)=>result,
//     );
//    return result;
// }

// module.exports=blogImage;

exports.uploads=(file,folder)=>{
    return new Promise(resolve=>{
        uploader.upload(file,(result)=>{
            resolve({
                url:result.url,
                id:result.public_id
            })
        },{
            resource_type:"auto",
            folder:folder
        })
    })
}