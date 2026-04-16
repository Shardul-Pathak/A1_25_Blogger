const Author = require('../schemas/auther-schema');

const getAuthorData = async () => {
  try {
    const authors = await Author.find();
    console.log('All Authors:', authors);
    return authors;
  } catch (error) {
    console.error(error);
   
  }
}

const addAuthor = async (authorData) => {
  try {
    const mappedData = {
      first_name: authorData.first_name,
      last_name: authorData.last_name,
      email: authorData.email,
      phone: authorData.phone,
      status: authorData.status || 'active',
      created: authorData.created || new Date()
    };

    const newAuthor = new Author(mappedData);
    const insertResult = await newAuthor.save();
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
   
  }
}

const updateAuthor = async (authorId, authorData) => {
  try {
    const mappedData = {
      first_name: authorData.first_name,
      last_name: authorData.last_name,
      email: authorData.email,
      phone: authorData.phone,
      status: authorData.status
    };

    const updateResult = await Author.findByIdAndUpdate(authorId, { $set: mappedData }, { new: true });
    console.log(`Author ${authorId} updated:`, updateResult);
    return updateResult;
  } catch (err) {
    console.log(err);
  }
}

const deleteAuthor = async (authorId) => {
  try {
    const deleteResult = await Author.findByIdAndDelete(authorId);
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
    
  }
}

module.exports = { getAuthorData, addAuthor, updateAuthor, deleteAuthor };
