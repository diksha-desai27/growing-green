require('../config/config');
const mongoose = require('mongoose');

const Donation = mongoose.model('Donation');

module.exports.donate = (req, res) => {
    var donation = new Donation();
    donation.order_id = req.body.order_id;
    donation.payer_email = req.body.payer_email;
    donation.payer_id = req.body.payer_id;
    donation.name = req.body.name.given_name + " " + req.body.name.surname;
    donation.amount = req.body.amount;
    donation.payment_status = req.body.payment_status;
    donation.save((err, data) => {
        if(!err){
            console.log(data);
            res.status(200).send({ data: data });
        } else {
            console.log(err);
            res.send({err});
        }
    });
}