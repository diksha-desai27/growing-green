const express = require('express');

const router = express.Router();
const ctrlEvent = require('../controller/event.controller');
const ctrlUser = require('../controller/user.controller');

const ctrlDonation = require('../controller/donation.controller');

router.post('/register', ctrlUser.register);

router.post('/socialRegister', ctrlUser.socialRegister);

router.post('/signin', ctrlUser.signin);

router.get('/profile/:id', ctrlUser.profile);

router.post('/donate', ctrlDonation.donate);

router.post('/addEvent',ctrlEvent.createEvent);

router.get('/getAllEvents',ctrlEvent.eventList);

router.get('/getEvent/:id',ctrlEvent.findEvent);

router.post('/registerEvent/:id',ctrlUser.events);

router.delete('/cancelEvent/:userId/:eventId',ctrlUser.cancel);

router.put('/updateEvent/:userId',ctrlUser.feedback);

module.exports = router;