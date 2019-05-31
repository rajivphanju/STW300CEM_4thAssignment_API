
const mongoose = require('mongoose');
const Item = mongoose.model('Item',{
    item_name:{
        type: String
    },
    item_price:{
        type:Number
    },
    item_image_name:{
        type:String
    },
    item_description:{
        type:String
    }
});
module.exports = Item;