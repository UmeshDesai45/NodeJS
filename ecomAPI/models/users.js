const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: Number,
    active: Boolean
});
//Creating collection and exporting
module.exports= mongoose.model('Users', userSchema); 