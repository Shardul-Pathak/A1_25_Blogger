const Category = require('../schemas/category-schema');

const getCatDetails = async () => {
  try {
    const categories = await Category.find();
    console.log('All Categories:', categories);
    return categories;
  } catch (error) { 
    console.error(error);
  }
}

const addCategory = async (categoryData) => {
  try {
    const mappedData = {
      cat_name: categoryData.cat_name,
      cat_desc: categoryData.cat_desc,
      status: categoryData.status,
      created: categoryData.created || new Date()
    };

    const newCategory = new Category(mappedData);
    const insertResult = await newCategory.save();
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
  }
}

const updateCategory = async (catid, catPostData) => {
  try {
    console.log(catid);
    console.log(catPostData);
    
    const mappedData = {
      cat_name: catPostData.cat_name,
      cat_desc: catPostData.cat_desc,
      status: catPostData.status
    };

    const updateResult = await Category.findByIdAndUpdate(catid, { $set: mappedData }, { new: true });
    console.log(updateResult);
    return updateResult;
  } catch (err) {
    console.log(err);
  }
}

const deleteCatData = async (catid) => {
  try {
    const deleteResult = await Category.findByIdAndDelete(catid);
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getCatDetails, addCategory, updateCategory, deleteCatData };
