const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    totalEarnings: {
        type: Number,
        required: true,
        default: 0,
    },
    totalExpenses: {
        type: Number,
        required: true,
        default: 0, 
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['earning', 'expense'], 
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                default: '',
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Tracker', trackerSchema);
