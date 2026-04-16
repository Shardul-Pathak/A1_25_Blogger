
const catModel = require('../model/category-model');



async function getAllCatList(req, res) {
  try {
    const catData = await catModel.getCatDetails();
    res.send(catData);
  } catch (err) {
    console.error('Error getting category details: ' + err);
    res.send('Error getting category details');
  }
}


let  addCategory= async (req, res)=> {

  try{
    
    let catData = req.body;
    let data = await catModel.addCategory(catData);
    res.send(data);
    console.log('add category');
  }catch(err){
    console.log(err);
    res.send(err);
  }
}





let updatecat= async (req, res)=> {
  let catid = req.params.cid;
  let catPostData = req.body;
  try{
    let data = await catModel.updateCategory(catid,catPostData);
    res.send(data);
    console.log('update category');
  }catch(err){
    console.log(err);
  }
 }
async function deletecat(req, res) {
 
  
  try{
    
    let data = await catModel.deleteCatData(req.params.cid );
    res.send(data);
    console.log('delete category');
  }catch(err){
    console.log(err);
    
  }
}

module.exports = { addCategory, getAllCatList, updatecat, deletecat};
