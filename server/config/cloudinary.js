const cloudinary=require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dnipqs2mh', 
    api_key: '121464622239229', 
    api_secret: 'TxX4BUeXzeQVBohgb7n9rxrnro8' 
});

exports.uploads=(file,folder)=>{
    return new Promise(resolve=>{
        cloudinary.uploader.upload(file,(result)=>{
            resolve({
                url:result.url,
                id:result.public_id
            })
        },{
            resource_type:'auto',
            folder:folder
        })
    })
}


