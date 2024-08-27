import mongoose from "mongoose";
// import Validation from 'express-validator';

// Defining Schema 
const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        unique : true,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    }
},
 { timestamps: true }
)

// Compile the schema
const UserModel = mongoose.model("user",UserSchema);

export default UserModel;
