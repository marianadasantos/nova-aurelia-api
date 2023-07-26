const mongoose = require('mongoose')

const peopleSchema = mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: ()=> new mongoose.Types.ObjectId()
    },
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
    sexualOrientation: {type: String, required: true},
},
{versionKey: false},
{timestamps: true}
)

const People = mongoose.model('people', peopleSchema)

module.exports = People