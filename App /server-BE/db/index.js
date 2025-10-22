const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI, {})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db


  