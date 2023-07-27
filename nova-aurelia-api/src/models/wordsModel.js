const mongoose = require('mongoose')

const wordsSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: ()=> mongoose.Types.ObjectId()
        },
        word: {type: String, required: true},
        description: {type: String, required: true, minLength: 2, maxLenght: 200, default: 'Inform description'},
        year: {type: Number, required: true},
        state: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'people'},
        username: {type: String, required: true}
    },
    {timestamps: true}
 )

const Words = mongoose.model('Words', wordsSchema)

module.exports = Words