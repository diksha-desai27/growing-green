const mongoose = require('mongoose');

var donationSchema = new mongoose.Schema({
    order_id : {
        type: String
    },
    payer_email: {
        type: String
    }, 
    payer_id: {
        type: String,
    },
    name: {
        type: String,
    },
    amount: {
        type: String
    },
    payment_status: {
        type: String
    }
});

mongoose.model('Donation', donationSchema);
