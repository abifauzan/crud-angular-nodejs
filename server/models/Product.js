var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},
{
    collection: 'products'
});

module.exports = mongoose.model('Product', ProductSchema);