const multer = require('multer');
const Blog = require("../models/blogModel.js");
const logs = require("./logger.js");
const multiparty = require("multiparty");
const fs = require('fs');
const folderName = "uploads";
const IMAGE_BASE_URL = "http://localhost:3000/uploads/";
try {

} catch (err) {
  console.error(err);
}

const addBlog = async(req, res) => {

    try{

            if (!fs.existsSync(folderName)) {

                fs.mkdirSync(folderName);
        }

        let form = new multiparty.Form({uploadDir: folderName})

        form.parse(req, function(err, fields, files) {
            if(err) return res.send({error : err.message});

            const imgPath = files.blog_image[0].path;
            const imageFile = imgPath.slice(imgPath.lastIndexOf("\\")+1);
            const imageUrl = IMAGE_BASE_URL + imageFile;

            console.log(imageUrl);

        const newBlog = new Blog ({

            blog_title: fields.title[0],
            blog_image: imageUrl,
            blog_detail: fields.detail[0],
            meta_title: fields.meta[0],
            blog_desc: fields.desc[0],
            status: fields.status[0],
            short_desc: fields.sdesc[0],
            created_by: fields.created_by[0]
        });

        newBlog.save();
        logs.newLog.log('info', "Signup Successfull");

        res.send({
            Request_Status: "New Blog Added",
            blog_title: fields.title[0],
            blog_image: imageUrl,
            blog_detail: fields.detail[0],
            meta_title: fields.meta[0],
            blog_desc: fields.desc[0],
            status: fields.status[0],
            short_desc: fields.sdesc[0],
            created_by: fields.created_by[0]
        })

        })


    }catch(e) {
        console.log(e);
    }
}

const newImg = async(req, res)=> {

}


module.exports = {addBlog, newImg};