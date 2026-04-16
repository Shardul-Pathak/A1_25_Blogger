
const Posts = require('../models/posts');
const category = require('../models/category');

let getPost = async (req,res) =>{
   
    const posts = await Posts.find().populate('user').populate('category').exec();
    console.log(posts);
	res.send(posts)
}

let getPostById = async (req,res) =>{
    let postId = req.params.pid;
    const post = await (await Posts.findOne({ _id: postId })).populate('category');
    console.log(post);
	res.send(post)
}


let addPost = async (req,res) =>{
    let postData = req.body;
    // let catId = req.params.cid;
    // let authId = req.params.authid; 
    let {title, description, status, created, userId, catId} = postData;
    const post = new Posts({
		title: title,
		description: description,
        status: status,
        user: userId,
        category: catId,
        created: created
	})
	await post.save()
	res.send(post)
    
}

let updatePost = async (req, res) => {
    let postId = req.params.pid;
    const post = await Posts.findOne({ _id: postId })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.description) {
			post.description = req.body.description
		}

        if (req.body.status) {
			post.status = req.body.status
		}

		await post.save()
		res.send(post)
    
}

module.exports = { getPost, addPost, updatePost, getPostById };