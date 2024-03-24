const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type:Number,
        unique:true
    },
    firstName:String,
    lastName:String,
    password:String,
    repassword:String,
    addresh:String,
    aboutBroker:String,
    isbroker:Boolean,
    profilePhoto:String,
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel; 