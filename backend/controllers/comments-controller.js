const comment_model = require('../model/comment-model')

let  getAllCommentList= async (req,res)=>{
    
    try{
        let data = await  comment_model.getCommentDetails(); 
        res.send(data);
    }catch(err){
        res.send(err);
    }
}

let  InsertComment= async (req,res)=>{
    
    try{
        let data = await  comment_model.insertComment(req.body); 
        res.send(data);
    }catch(err){
        res.send(err);
    }
}

let  UpdateComment= async (req,res)=>{
        let commentId = req.params.cid;
        let commentsData=req.body;
    try{
        let data = await  comment_model.updateComment(commentId,commentsData); 
        res.send(data);
    }catch(err){
        res.send(err);
        console.log(err)
    }
}

let deleteComment= async (req,res)=>{
    try{
        let data = await  comment_model.deleteComment(req.params.cid); 
        res.send(data);
    }catch(err){
        res.send(err);
        console.log(err)
    }
}


module.exports={getAllCommentList,InsertComment,UpdateComment,deleteComment}