const wordsModel = require('../models/wordsModel')
const userModel = require('../models/peopleModel')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const findAllWords = async (req,res)=>{
    try {
        const allWords = await wordsModel.find()
        res.status(200).json(allWords)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const findsWordById = async (req,res)=>{
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
        const findById = await wordsModel.findById(id)
        if(findById == null){
            return res.status(404).json({message: `A palavra de id ${id} não existe`})
        }
        res.status(200).json(findById)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const createWord = async (req,res)=>{
    try {
        
        const {word, description, year, state, userId} = req.body
        if(!userId){
            return res.status(400).json({message: 'O userId é necessário'})
        }

        const findUser = await userModel.findById(userId)

        if(!findUser){
            return res.status(404).json({message: 'O usuário não foi encontrado'})
        }
        
        const username = findUser.username 
        const newWord = new wordsModel({word, description, year, state, userId, username})

        const savedWord = await newWord.save()

        res.status(201).json({message: 'Nova palavra adicionada!', savedWord})
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message)
    }
}

const findByWord = async (req,res)=>{
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

            const wordRequested = req.params.word.toLocaleLowerCase()
            
            let words = []
        words = await wordsModel.find({word: {'$regex': wordRequested}})
            if(words.length === 0){
                res.status(404).json(`A palavra ${wordRequested} não foi registrada ainda`)
            }
            else{
                res.status(200).json(words)
            }
            
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const findByYear = async (req,res)=>{
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

            const yearRequested = req.params.year
            
            let years = []
            years = await wordsModel.find({year: {$eq: yearRequested}})
            if(years.length === 0){
                res.status(404).json(`Nenhuma palavra foi registrada em ${yearRequested}`)
            }
            else{
                res.status(200).json(years)
            }
            
            
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const findByUsername = async (req,res)=>{
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
            
            const usernameRequested = req.params.username.toLocaleLowerCase()
            
            let user = []
            user = await wordsModel.find({username: {$eq: usernameRequested}})
            if(user.length === 0){
                res.status(404).json(`${usernameRequested} ainda não postou nenhuma palavra`)
            }
            else{
                res.status(200).json(user)
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}


const updateWordById = async (req,res)=>{
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
        const {word, description, year, state} = req.body
        const updateWord = await wordsModel.findByIdAndUpdate(id, {word, description, year, state})
        if(updateWord == null){
            return res.status(404).json({message: `A palavra de id ${id} não existe`})
        }
        res.status(200).json({message: "Palavra atualizada!", updateWord })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const updateByWord = async (req,res)=>{
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

        const modifiedWord = req.params.word.toLocaleLowerCase()

        const {word, description, year, state} = req.body
        const updateWord = await wordsModel.findOneAndUpdate({word: {$eq: modifiedWord}}, {word: word, description: description, year: year, state: state})
        if(updateWord == null){
            return res.status(404).json({message: `${modifiedWord} não existe`})
        }
         res.status(200).json({ message: "Palavra atualizada!", updateWord })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const deleteWordById = async (req,res)=>{
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
        const deletedWord = await wordsModel.findByIdAndDelete(id)

        if(deletedWord==null){
            return res.status(404).json({mesage: `A palavra de id ${id} não foi encontrada`})
        }
        res.status(200).json({ message: `A palavra de id ${id} foi deletada com sucesso!`, deletedWord })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const deleteByWord = async (req,res)=>{
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

        const requestedWord = req.params.word.toLocaleLowerCase()

        const deletedWord = await wordsModel.findOneAndDelete({word: {$eq: requestedWord}})
        if(deletedWord == null){
            return res.status(404).json({message: `${requestedWord} não existe`})
        }
         res.status(200).json({ message: "Palavra deletada!", deletedWord })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}


const deleteByYear = async (req,res)=>{
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

        const {year} = req.params
        let deletedYear = []
        deletedYear = await wordsModel.deleteMany({year: {$in: year}})
        if(deletedYear.deletedCount === 0){
            return res.status(404).json({message: `Nenhuma palavra registrada em ${year}`})
        }
        res.status(200).json({ message: `Palavras de ${year} foram deletadas!`, deletedYear })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const deleteByUser = async (req,res)=>{
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

        const {username} = req.params
        let deletedByUsername = []
        deletedByUsername = await wordsModel.deleteMany({username: {$in: username}})
        if(deletedByUsername.deletedCount === 0){
            return res.status(404).json({message: `Nenhuma palavra foi registrada por ${username}`})
        }
        res.status(200).json({ message: `Palavras registradas por ${username} foram deletadas!`, deletedByUsername})
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

module.exports ={
    findAllWords,
    findsWordById,
    createWord,
    findByWord,
    findByYear,
    findByUsername,
    updateWordById,
    updateByWord,
    deleteWordById,
    deleteByWord,
    deleteByYear,
    deleteByUser
}