const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  cat_name: String,
  cat_desc: String,
  status: String,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('categories', categorySchema);



// const categorySchema = new mongoose.Schema({
//     category_name: String,
//     description: String,
//     status: String,
//     created: {
//       type: Date,
//       default: Date.now
//     },
//     posts: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Posts'
//     }]
//   });
// {
//     catgory_name: "Sport",
//     description: "sports",
//     status: "1",
//     posts: ["1234", "2345", "3456"]
// }