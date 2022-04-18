const { articleSchema, updateArticleSchema } = require('../helpers/validation_schema');
const Article=require('../models/articleModel');



var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

exports.getAllArticles = function(req, res) {
    Article.find()
    .then(result=>{
        res.json(result)
    })
    
};
exports.createNewArticle = async function (req, res)  {
    // const { title,content }=req.body;
    try {
        const valationResult = await articleSchema.validateAsync(req.body);
    
        if(req.user.role.toString()=='admin')
        {
        const article= new Article({
            title:valationResult.title,
            content:valationResult.content,
            postedDate: today
        })
        article.save()
        .then(result=>{
            res.json(result)
        })
        .catch(error=>console.log(error))
    }
    else
    {
        res.json({message:'User Not Authorized'}).status(401)
    }
    }
    catch (err) { 
        res.json(err.details[0].message).status(422)
    }
    
};
exports.getOneArticle=(req,res)=>{
    const {id}=req.params
    Article.findOne({_id:id})
    .then(result=>{
        if(result)
        res.json(result)
        else 
        res.json('article doesn\'t exist!').status(404)
    })
    .catch(error=>{
        res.status(404).json({error:error.message})
    })
}

exports.updateArticle=async (req,res)=>{
    const {id}=req.params
    const { title,content }=req.body;
    try {
        const valationResult = await updateArticleSchema.validateAsync({article_id:id,title,content});
        if(req.user.role.toString()=='admin')
        {
        Article.findOne({_id:id})
        .then(article=>{
            if(valationResult.title)
            article.title=valationResult.title;
            if(valationResult.content)
            article.content=valationResult.content
            article.save()
            .then(result=>res.json(result).status(200))
            .catch(error=>console.log(error))
            
        })
        .catch(error=>{
            res.status(404).json({error:'article doesn\'t exist!'})
        })
    }
    else
    {
        res.json({message:'User Not Authorized'}).status(401)
    }
    }
    catch(err){
res.json(err)
    }
}

exports.deleteArticle=(req,res)=>{
    const {id}=req.params
    if(req.user.role.toString()=='admin')
        {
        Article.deleteOne({_id:id})
        .then(result=>{
            res.json(result)
        })
        .catch(error=>{
            res.status(404).json({error:'article doesn\'t exist!'})
        })
    }
    else
    {
        res.json({message:'User Not Authorized'}).status(401)
    }
}

exports.commentingOnArticle=(req,res)=>{
    const {article_id,comment}=req.body
    const user_id=req.user._id

    const newComment={
        user_id,
        comment,
        postedDate: today
    }
    Article.findOne({_id:article_id})
    .then(article=>{
        if(article)
        {
            article.comments.push(newComment);
            article.save()
            .then(result=>res.json(result))
            .catch(error=>res.json({error:error.message}))
        }
        else res.json({error:"article doesn't exist"})
    })
    .catch(error=>res.json({error:error.message}))
}

exports.likeArticle=(req,res)=>{
    const {article_id}=req.body
    const user_id=req.user._id

    const newLike={
        user_id,
    }
    Article.findOne({_id:article_id})
    .then(article=>{
        if(article)
        {
            const found = article.likes.some(el => el.user_id.toString() === user_id.toString());
            if (found) {
               article.likes=article.likes.filter(item=>item.user_id.toString()!==user_id.toString())
               
            }else 
            {
                 article.likes.push(newLike);
            }
            article.save()
            .then(result=>res.json(result))
            .catch(error=>res.json({error:error.message}))
        }
        else res.json({error:"article doesn't exist"}).status(400)
    })
    .catch(error=>res.json({error:error.message}))
}