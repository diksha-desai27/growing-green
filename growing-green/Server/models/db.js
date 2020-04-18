const mongoose  = require('mongoose');
require('./donation.model');
require('./Event.model');
require('./user.model');
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) {
        console.log('MongoDb connection succeeded');
    }   else {
        console.log('Mongodb connection failed' + JSON.stringify(err, undefined, 2));
    }
}); 

