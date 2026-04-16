const posts = require('../schemas/posts-schema');
const Category = require('../schemas/category-schema');

const getPostDetails = async () => {
  try {
    const postData = await posts.find()
    .populate('cat_id', '_id cat_name cat_desc')
    .populate('auth_id', '_id first_name last_name email phone');

    console.log(postData);
    return postData;
  } catch (error) {
    console.error(error);
  }
};

const addPostDetails = async (postData) => {
  try {
    const mappedData = {
      title: postData.title,
      description: postData.description,
      status: postData.status,
      created: postData.created || new Date(),
      cat_id: postData.cat_id,
      auth_id: postData.auth_id
    };

    const newPost = new posts(mappedData);
    const insertResult = await newPost.save();

    console.log('Inserted post:', insertResult);
    return insertResult;
  } catch (err) {
    console.error(err);
  }
};

const updatePostDetails = async (idpost, data) => {
  try {
    const mappedData = {
      title: data.title,
      description: data.description,
      status: data.status,
      created: data.created || new Date(),
      cat_id: data.cat_id,
      auth_id: data.auth_id
    };

    const updateResult = await posts.findByIdAndUpdate(idpost, { $set: mappedData }, { new: true });
    console.log('Update result:', updateResult);
    return updateResult;
  } catch (err) {
    console.error(err);
  }
};

const deletePostDetails = async (idpost) => {
  try {
    const deleteResult = await posts.findByIdAndDelete(idpost);
    console.log('Delete result:', deleteResult);
    return deleteResult;
  } catch (err) {
    console.error(err);
  }
};

const updatePostdetails = updatePostDetails;

module.exports = { getPostDetails, addPostDetails, updatePostDetails, updatePostdetails, deletePostDetails };
