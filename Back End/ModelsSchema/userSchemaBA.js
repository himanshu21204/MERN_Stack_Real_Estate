const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    phoneNumber:Number,
    addresh:String,
    
    aboutBroker:String
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel; 