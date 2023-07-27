const DB_URI = process.env.DB_URI

const mongoose = require('mongoose')

const connect = async ()=>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}