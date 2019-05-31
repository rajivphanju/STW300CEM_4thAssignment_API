const mongoose = require('mongoose');

// a user model
const User = mongoose.model('User', {
    first_name: {
    type: String
    },
    last_name: {
    type: String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
   });

  module.exports = User; //User= variable name