const { messageSchema } = require("../helpers/validation_schema");
const Message = require("../models/messageModel")

const sendMessage=async (req,res)=>{
  try {
    const valationResult = await messageSchema.validateAsync(req.body);
    const message=new Message({
        name:valationResult.name,
        email:valationResult.email,
        message:valationResult.message
    })
    message.save()
    .then(result=>{
        res.json({message:'message sent successful'})
    })
  } catch (error) {
      res.json({error})
  }
}

const getAllMessages=async (req,res)=>{
    if(req.user.role.toString()=='admin')
        {
    Message.find()
    .then(messages=>{
        res.json({messages})
    })
    .catch(error=>res.json(error))
}else
{
    res.json({message:'User Not Authorized'}).status(401)
}

}

module.exports={
    sendMessage,getAllMessages
}