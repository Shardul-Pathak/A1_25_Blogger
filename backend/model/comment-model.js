const Comment = require('../schemas/comment-schema');

const getCommentDetails = async () => {
  try {
    const comments = await Comment.find().populate('post_id', '_id title');
    console.log('All Comments:', comments);
    return comments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const insertComment = async (commentData) => {
  try {
    const mappedData = {
      comment: commentData.comment,
      subject: commentData.subject,
      status: commentData.status,
      created: commentData.created || new Date(),
      post_id: commentData.post_id
    };

    const newComment = new Comment(mappedData);
    const insertResult = await newComment.save();
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const updateComment = async (Id, commentsData) => {
  try {
    const mappedData = {
      comment: commentsData.comment,
      subject: commentsData.subject,
      status: commentsData.status,
      post_id: commentsData.post_id
    };

    const updateResult = await Comment.findByIdAndUpdate(Id, { $set: mappedData }, { new: true });
    console.log(updateResult);
    return updateResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteComment = async (idpost) => {
  try {
    const deleteResult = await Comment.findByIdAndDelete(idpost);
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { getCommentDetails, insertComment, updateComment, deleteComment };
