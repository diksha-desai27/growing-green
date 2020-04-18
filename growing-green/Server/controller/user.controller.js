require('../config/config');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
var jwt = require('jsonwebtoken');
var where = require("lodash");

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, data) => {
        if (!err) {
            var token = jwt.sign({ id: user._id }, 'secretkey', {
                expiresIn: 86400 // expires in 24 hours
            });
            console.log(data);
            res.status(200).send({ auth: true, token: token, data: data });
            // res.send(data);
        } else {
            if (err.code == 11000) {
                res.status(422).send(['Duplicate email address found']);
            } else {
                return next(err);
            }
        }
    });
}

module.exports.signin = (req, res) => {
    var email = req.body.email;
    var response = {};
    User.find({
        'email': email
    }, function (err, data) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            if (data.length == 0) {
                response = { data: "User not found", status: "201" };
            }
            else {
                var passwordIsValid = bcrypt.compareSync(req.body.password, data[0].password);
                console.log(passwordIsValid);
                if (!passwordIsValid) {
                    return res.status(401).send({ auth: false, token: null, status: "401" });
                }
                var token = jwt.sign({ id: res._id }, 'secretkey', {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(200).send({ error: false, token: token, auth: true, status: "200", data: data })

            }
        }
        res.json(response);
    });
}

module.exports.socialRegister = (req, res, next) => {
    var email = req.body.email;
    var response = {};
    User.find({
        'email': email
    },function(err, data)
    {
        if(!err)
        {
            if (data.length == 0) 
            {
                var user = new User();
                user.fullName = req.body.name;
                user.email = req.body.email;
                user.password = "Diksha@4522";
                user.save((err, data) => {
                    if(!err)
                    {
                        res.send({ auth: true, status: "200", token: req.body.authToken, data: data })
                    }
                    else
                    {
                        return next(err);
                    }
                });
            }
            else 
            {
                res.send({ status: "422", data: data, msg: "User already exists", token: req.body.authToken })
            }
     }
        else{
        //
        }
    });
}

module.exports.socialLogin = (req, res) => {
    var email = req.body.email;
    var response = {};
    User.find({
        'email': email
    },
        function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                if (data.length == 0) {
                    response = { data: "User not found", status: "201" };
                }
                else {
                    return res.status(200).send({ error: false, status: "200", data: data })

                }
            }
            res.json(response);
        });
}

module.exports.profile = (req, res) => {
    var id = req.params.id;
    User.findById(id, function (err, data) {
        if (err) {
            return res.status(404).send({ status: "404", err: err });
        } else {
            return res.status(200).send({ status: "200", data: data });
        }
    });

}


module.exports.events = (req, res) => {
    var id = req.params.id;
    User.findById(id, function (err, selectedUser) {
        console.log(selectedUser);
        if (!err) {
            if (!selectedUser) {
                res.status(401).send('Unauthorised user!');
            }
            else {
                var e1 = {};
                e1._id = req.body._id;
                e1.eventName = req.body.eventName;
                e1.eventDate = req.body.eventDate;
                e1.eventTime = req.body.eventTime;
                e1.eventLocation = req.body.eventLocation;
                e1.eventState = req.body.eventState;
                e1.eventCountry = req.body.eventCountry;
                e1.eventStatus = req.body.eventStatus;
                e1.eventDescription = req.body.eventDescription;
                e1.eventRating = "";
                e1.eventAttended = "";
                e1.eventComments = "";
                console.log(e1);
                if (!selectedUser.events) {
                    selectedUser.events = [];
                }
                var filtered = where.find(selectedUser.events, { '_id': req.body._id });
                console.log(selectedUser.events);
                console.log(filtered);
                if (!filtered) {
                    selectedUser.events.push(e1);
                    selectedUser.save().then((result, err) => {
                        if (!err) {
                            res.send({ status: '200', message: 'Event succesfully registered!', data: result });
                            var token = jwt.sign({ id: selectedUser._id }, 'secretkey', {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            let transporter = nodemailer.createTransport({
                                service: "Gmail",
                                port: 465,
                                secure: true, // true for 465, false for other ports
                                auth: {
                                    user: 'growinggreen04@gmail.com', // generated ethereal user
                                    pass: 'growinggreen@123',
                                    //  accessToken:  token// generated ethereal password
                                },
                                requireTLS: true
                            });


                            transporter.verify((err, success) => {
                                if (err) console.error('err', err);
                            });

                            let mailOptions = {
                                from: '"Growing Green" <growinggreen04@gmail.com>', // sender address
                                to: selectedUser.email, // list of receivers
                                subject: "Growing Green Event Registration", // Subject line
                                html: "Dear " + selectedUser.fullName + "<br/>" + "Thankyou for your registration. Details of your registration:<br/><br/>" + "Event Name:" + req.body.eventName + "<br/>" + "Event Location:" + req.body.eventLocation + "," + req.body.eventState + "," + req.body.eventCountry + "<br/>" + "Event date:" + req.body.eventDate + "<br/>" + "Event Time:" + req.body.eventTime + "<br/>" + "<br/><br/><br/>" + "Thankyou,<br/>Growing Green Team"  // html body
                            }

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });
                        } else {
                            res.send({ status: '400', err: err });
                        }
                    })
                } else {
                    res.send({ status: '201', message: 'You have already registered for this event', data: [] });
                }

            }
        } else {
            res.status(200).json({ status: '400', err: err });

        }
    });
}

module.exports.cancel = (req, res) => {
    var id = req.params.userId;
    var eventId = req.params.eventId;
    User.findById(id, function (err, selectedUser) {
        if (!err) {
            if (!selectedUser) {
                res.status(401).send('Unauthorised user!');
            }
            else {
                var filtered = where.find(selectedUser.events, { '_id': eventId });
                if (filtered) {
                    const index = selectedUser.events.indexOf(filtered);
                    selectedUser.events.splice(index, 1);
                    selectedUser.save().then((result, err) => {
                        if (!err) {
                            res.send({ status: '200', message: 'Registration cancelled successfully', data: selectedUser.events });
                            var token = jwt.sign({ id: selectedUser._id }, 'secretkey', {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            let transporter = nodemailer.createTransport({
                                service: "Gmail",
                                port: 465,
                                secure: true, // true for 465, false for other ports
                                auth: {
                                    user: 'growinggreen04@gmail.com', // generated ethereal user
                                    pass: 'growinggreen@123',
                                    //  accessToken:  token// generated ethereal password
                                },
                                requireTLS: true
                            });


                            transporter.verify((err, success) => {
                                if (err) console.error('err', err);
                            });

                            let mailOptions = {
                                from: '"Growing Green" <growinggreen04@gmail.com>', // sender address
                                to: selectedUser.email, // list of receivers
                                subject: "Growing Green Event Cancellation", // Subject line
                                html: "Dear " + selectedUser.fullName + "<br/>" + "Your registration has been cancelled<br/>" + "Thankyou,<br/>Growing Green Team"  // html body
                            }

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });

                        } else {
                            res.send({ status: '400', err: err });
                        }
                    })
                } else {
                    res.send({ status: '201', message: 'No event found', data: [] });
                }
            }
        } else {
            res.send({ status: '400', err: err });
        }
    });
}


module.exports.feedback = (req, res) => {
    var id = req.params.userId;
    console.log(id);
    User.findOneAndUpdate({ '_id': id, "events._id": req.body._id }, {
        '$set': {
            'events.$.eventComments': req.body.eventComments,
            'events.$.eventRating': req.body.eventRating,
            'events.$.eventAttended': req.body.eventAttended,
        }
    }, { new: true }, function (err, data) {
        if (!err) {
            res.send({ status: '200', message: 'Feedback recieved successfully', data: data });

        } else {
            res.send({ status: '201', err: err, data: [] });

        }

    });
}






