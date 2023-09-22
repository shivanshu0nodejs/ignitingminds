const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blog_title: {
        type: String,
        required: [true, "Please Enter Title"]

    },
    blog_image: {
        type: String,
        required: [true, "Please Enter Image"]

    },
    blog_detail: {
        type: String,
        required: [true, "Please Enter Detail"]

    },
    meta_title: {
        type: String,
        required: [true, "Please Enter Title"]

    },
    blog_desc: {
        type: String,
        required: [true, "Please Enter Description"]

    },
    status : {
        type: String,
        required: [true, "Please Enter Status"]

    },
    short_desc: {
        type: String,
        required: [true, "Please Enter Short Description"]

    },
    created_by: {
        type: String
    }},{
        timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);    