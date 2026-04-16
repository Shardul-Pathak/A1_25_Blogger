const mongoose = require("mongoose")

const schema = mongoose.Schema({
	first_name: String,
	last_name: String,
    email: String,
    phone: String,
    password: String,
    status: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", schema)