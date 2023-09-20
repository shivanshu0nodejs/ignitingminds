const axios = require('axios');
var FormData = require('form-data');
const User = require("../models/userModel.js");
const logs = require("./logger.js");
const igm = "IGM";

const signup = async (req, res) =>{
    
        try{

            const check = await User.findOne({phone: req.body.phone});

            if(check){

                res.send("User Already Registered");

            }else{
    
                const total = await User.countDocuments({});


                if(total>0){
                    
                    const last = await User.find().sort({_id:-1}).limit(1);
                    var numb = last[0].doc_num;

                }else{
                    var numb = 0;
                }
        
                if(total<10 ){
                    var userId = igm.concat("00000",numb + 1);
                }else if(total<100){
                    var userId = igm.concat("0000",numb + 1);
                }else if(total<1000){
                    var userId = igm.concat("000",numb + 1);
                }else if(total<10000){
                    var userId = igm.concat("00",numb + 1);
                }else if(total<100000){
                    var userId = igm.concat("0",numb + 1);
                }
    
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 4; i++ ) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }

                var phNum = req.body.phone;
                var msg = `Dear ${req.body.name}, ${OTP} is your LivFitt login OTP, do not share it with anyone. LivFitt`;
                let data = new FormData();
                data.append('apikey', 'NmU3ODU1Mzk3YTZhNzE2NjQzNGI3NDM0NDQzMTRiNGM=');
                data.append('numbers', phNum);
                data.append('sender', 'LVFITT');
                data.append('message', msg);
                
                let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: 'https://api.textlocal.in/send/',
                  headers: { 
                    'Cookie': 'PHPSESSID=t9ptng990ncra53oilasq0mf56', 
                    ...data.getHeaders()
                  },
                  data : data
                };
                
                axios.request(config)
                .then((response) => {

                })
                .catch((error) => {
                  console.log(error);
                });
    
                const totalNum = numb+1;
        
                const {name, email, phone} = req.body;
                const addNew = new User ({
                    userId: userId,
                    doc_num: totalNum,
                    name: name,
                    email: email,
                    phone: phone,
                    otp: OTP,
                    status:0
                });

                logs.newLog.log('info', "Signup Successfull");
                addNew.save();
                res.status(201).send({
                    Response: "Signup Successfull",
                    Request_Status: 1,
                    userId: userId,
                    doc_num: totalNum,
                    name: name,
                    email: email,
                    phone: phone,
                    otp: OTP,
                    status:0
                });
            }

        }catch(e){
    
            console.log(e);
            res.send(e);
        }
};

const login = async (req, res) =>{

    try{

        const userExist = await User.findOne(req.body);

        if(userExist){

            res.send("Login Successfull");

            logs.newLog.log('info', "Login Successfull");
        }else{

            res.send("User Not Exist");
        }
    }catch(e) {
        console.log(e);
    }

};

const signupOtp = async (req, res) =>{

    try{

        const data = await User.findOne({phone: req.body.phone});
        
        if(data) {
            const getOtp = data.otp;
            const userOtp = req.body.otp;

            if(getOtp == userOtp ){
                
            const updateStatus =  await User.updateOne({ phone: req.body.phone }, {$set: {status: 1}});

            console.log("Login Success");
            res.send("Login Success");
            logs.newLog.log('info', "OTP Matched");

            }else{
            console.log("Invalid Otp");
            res.send("Invalid Otp");
            }
            console.log(getOtp);
            res.send({data});
        }else{
            console.log("User Not Found");
            res.send("User Not Found");

        }

    }catch(e) {

        console.log(e);

    }
}

const loginOtp = async (req, res) =>{

    try{

        const data1 = await User.findOne({phone: req.body.phone});

        if(data1){


            const getOtp = data1.otp;
            const userOtp = req.body.otp;

            if(getOtp == userOtp ){
                
            const updateStatus =  await User.updateOne({ phone: req.body.phone }, {$set: {status: 1}});

            console.log("Login Success");
            res.send("Login Success");
            logs.newLog.log('info', "OTP Matched");

            }else{
            console.log("Invalid Otp");
            res.send("Invalid Otp");
            }

        }else{
            console.log("User Not Found");
            res.send("User Not Found");

        }

    }catch(e) {

        console.log(e);

    }
}

const resendOtp = async (req, res) =>{

    try{

        const data1 = await User.findOne({phone: req.body.phone});
        
        if(data1) {

            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 4; i++ ) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            console.log(OTP);
            var phNum = req.body.phone;
            var msg = `Dear ${data1.name}, ${OTP} is your LivFitt login OTP, do not share it with anyone. LivFitt`;
            let data = new FormData();
            data.append('apikey', 'NmU3ODU1Mzk3YTZhNzE2NjQzNGI3NDM0NDQzMTRiNGM=');
            data.append('numbers', phNum);
            data.append('sender', 'LVFITT');
            data.append('message', msg);
            
            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://api.textlocal.in/send/',
              headers: { 
                'Cookie': 'PHPSESSID=t9ptng990ncra53oilasq0mf56', 
                ...data.getHeaders()
              },
              data : data
            };

            axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });

            const updateOtp =  await User.updateOne({ phone: req.body.phone }, {$set: {otp: OTP}});

            console.log("OTP Sent");
            res.send({
                Request_Status: "OTP Sent",
                Otp: OTP
                
            });
            logs.newLog.log('info', "OTP Sent");

        }else{
            console.log("User Not Found");
            res.send("User Not Found");

        }

    }catch(e) {

        console.log(e);

    }
}


module.exports = {signup, login, signupOtp, loginOtp, resendOtp};
