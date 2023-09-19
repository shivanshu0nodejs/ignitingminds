const axios = require('axios');
var FormData = require('form-data');
const User = require("../models/userModel.js");
const logs = require("./logger.js");

const home = async (req, res) =>{

    try{

        res.send("Home Page Of Igniting Minds");


    }catch(e){

        console.log(e);
    }
}

module.exports = {home};