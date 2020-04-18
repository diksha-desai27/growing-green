var env = process.env.NODE_ENV || 'development'

var config = require('./config.json');

var envConfig = config[env];

module.exports = {
    'secret': 'supersecret'
  };
  
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);