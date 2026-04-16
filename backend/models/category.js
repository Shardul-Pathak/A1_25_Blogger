const mongoose = require("mongoose");

const schema = mongoose.Schema({
	cat_name: String,
	cat_desc: String,
    status: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("categories", schema)