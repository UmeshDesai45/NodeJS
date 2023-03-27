const mongoose= require('mongoose');

const productSchema= mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: String,
    images: [String],
    category: String
});

//Collection name
module.exports= mongoose.model('Products', productSchema);