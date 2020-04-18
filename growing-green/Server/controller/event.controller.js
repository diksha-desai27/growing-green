require('../config/config');
const mongoose = require('mongoose');
const Event = mongoose.model('Event');


module.exports.createEvent = (req, res,next) => {
    var event1 = new Event();
    event1.eventName = req.body.eventName;
    event1.eventDate = req.body.eventDate;
    event1.eventTime = req.body.eventTime;
    event1.eventId = req.body.eventId;
    event1.eventComments = req.body.eventComments;
    event1.eventLocation = req.body.eventLocation;
    event1.eventState = req.body.eventState;
    event1.eventCountry = req.body.eventCountry;
    event1.eventDescription = req.body.eventDescription;
   // event1.eventAttended = req.body.eventAttended;
   // event1.eventStatus = req.body.eventStatus;
   // event1.eventRating = req.body.eventRating;
    console.log(event1);
    event1.save((err, data) => {
        console.log(data);
        if (!err) {
            res.status(200).send({  data: data });
            // res.send(data);
        } else {
            res.status(400).send(['Invalid Data']);
        }
    });

}

module.exports.eventList = (req, res) => {
        Event.find().then(result=>{
            res.status(200).send({status: "200", data: result});
        }).catch(err=>{
        return res.status(200).send({status: "400", err:err });
    });
}

module.exports.findEvent = (req, res) => {
    var id = req.params.id;
    console.log(id);
    Event.findById(id, function(err, data) {
        if(err) {
            return res.status(404).send({ status: "404", err: err});
        } else {
            console.log(data);
            return res.status(200).send({status: "200", data: data });
        }
    });
}



