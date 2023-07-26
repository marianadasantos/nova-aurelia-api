const app = require('./src/app')

const PORT = process.env.PORT || 8080

app.get('/', (req,res)=>{
    res.send({message: 'API Dicionário LGBTQIAP+!'})
})

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})