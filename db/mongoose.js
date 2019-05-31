const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/STW300CEM-4thAssignment',{
    useNewUrlParser:true,
    useCreateIndex:true
});