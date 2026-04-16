const mongoose = require("mongoose");

const schema = mongoose.Schema({
	title: String,
	description: String,
    status: String,
    created: {
        type: Date,
        default: Date.now
    },
    auth_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors'
    },
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
})

module.exports = mongoose.model("Posts", schema)