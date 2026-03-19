const mongoose = require('mongoose');

const buddySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    age: {
        type: Number,
        default: 0,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true  
    },
    breed: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default:'',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('Buddy', buddySchema);