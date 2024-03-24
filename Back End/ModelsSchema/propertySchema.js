const mongoose = require('mongoose')
const {Schema} = mongoose

const propertySchema = new Schema({
    homeTitle: String,
    homeDescription: String,
    homePrice: String,
    homeAddress: String,
    homeCountry_State: String,
    homeCity: String,
    homeCountry: String,
    homeZip: String,
    homeSizeinft: String,
    homeRooms: String,
    homeBedrooms: String,
    homeBathrooms: String,
    homeGarages: String,
    homeGaragesize: String,
    homeYearbuilt: String,
    homeBasement: String,
    homePropertyType: String,
    homePropertyID: String,
    homePropertyStatus: String,
    brokerID:String,
    photos:[String],
});

const propertyModel = mongoose.model('propertyData',propertySchema);

module.exports = propertyModel; 