require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");

const PORT = process.env.PORT || 3000;

app.use(express.json());

const user_routes =require("./routes/userRoutes.js");

app.use("/", user_routes);

app.use('/uploads', express.static('uploads'));

const start = async() => {

    try{

        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`Connected To PORT ${PORT}`);
        });
    }catch (error){
        console.log(error);
    }
};

start();
