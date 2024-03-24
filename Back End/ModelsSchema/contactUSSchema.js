const mongoose = require('mongoose')
const {Schema} = mongoose

const contactUSSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    message:String,
})

const contactUSModel = mongoose.model('contactUs',contactUSSchema);

module.exports = contactUSModel; 