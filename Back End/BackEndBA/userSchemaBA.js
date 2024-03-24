const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const userBASchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true
    },
    addresh: String, 
    aboutBroker: String,
    isBroker:Boolean,
});


// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'User', field: '_id', startAt: 1 });

const UserModel = mongoose.model('UserBroker', userBASchema);

module.exports = UserModel;
