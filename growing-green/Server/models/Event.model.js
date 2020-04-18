const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    eventName : String,
    eventDate :String,
    eventTime : String,
    eventLocation : String,
    eventState : String,
    eventCountry : String,
    eventStatus : String,
    eventDescription : String
});



 mongoose.model('Event', eventSchema);
