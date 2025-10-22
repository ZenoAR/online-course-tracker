const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: [String], required: true },
        term: { type: [String], required: true},
        location: { type: String, required: true },
        credit_hr: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('courses', Course)
