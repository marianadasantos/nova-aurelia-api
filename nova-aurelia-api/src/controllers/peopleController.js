const peopleModel = require('../models/peopleModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const addNewUser = (req,res)=>{
    const {username,email,password,name,age,gender,sexualOrientation} = req.body
    const passwordWithHash = bcrypt.hashSync(password, 10)
    //req.body.password = passwordWithHash

    const newUser = new peopleModel({username,email,password:passwordWithHash,name,age,gender,sexualOrientation})

    newUser.save(function(err){
        if(err){
            res.status(500).send({message: err.message})
        }
        res.status(201).send(newUser.toJSON())
    })
}

const findAllUsers = async (req,res)=>{
    try {
        const authHeader = req.get('authorization')
        if(!authHeader){
            return res.status(401).send('Informação de autorização é necessária')
        }
        const token = authHeader.split(' ')[1]
        jwt.verify(token, SECRET, async function(err){
            if(err){
                return res.status(403).send('Acesso não autorizado')
            }
        const allUsers = await peopleModel.find()
        if(allUsers.length == 0){
            return res.status(404).json({message: 'Nenhum user foi adicionada ainda'})
        }
        res.status(200).json(allUsers)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const findUserById = async (req,res)=>{
    try { 
        const authHeader = req.get('authorization')
        if(!authHeader){
            return res.status(401).send('Informação de autorização é necessária')
        }
        const token = authHeader.split(' ')[1]
        jwt.verify(token, SECRET, async function(err){
            if(err){
                return res.status(403).send('Acesso não autorizado')
            }
        const {id} = req.params
        const findUser = await peopleModel.findById(id)
        if(findUser == null){
            res.status(404).json({message: `Nenhum user registrado com a id ${id}`})
        }
        res.status(200).json(findUser)
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({message: error.message})
    }
}

const login = (req,res)=>{
    peopleModel.findOne({username: req.body.username}, function(err, people){
        if(!people){
            return res.status(404).send(`Ninguém com o username ${req.body.username} foi encontrado`)
        }
        
        const validPassword = bcrypt.compareSync(req.body.password, people.password)

        if(!validPassword){
            return res.status(403).send(`Erro ao digitar senha`)
        }

        const token = jwt.sign({username: req.body.username}, SECRET)
        return res.status(200).send(token)
    })
}

const deleteUserById = async (req,res)=>{
    try {
        const authHeader = req.get('authorization')
        if(!authHeader){
            return res.status(401).send('Informação de autorização é necessária')
        }
        const token = authHeader.split(' ')[1]

        jwt.verify(token, SECRET, async function(err){
            if(err){
                return res.status(403).send('Acesso não autorizado')
            }
        })

        const {id} = req.params 
        const deletedPeople = await peopleModel.findByIdAndDelete(id)
        if(deletedPeople == null){
            return res.status(404).json({message: `A pessoa de id ${id} não foi encontrada`})
        }
        const message = `O user de id ${id} foi deletado com sucesso!`
        res.status(200).json({message})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}


module.exports= {
    addNewUser,
    findAllUsers,
    findUserById,
    login,
    deleteUserById   
}