const wordsModel = require('../src/models/wordsModel')

describe("GET model test", ()=>{
    const words = new wordsModel({
        "word": "words test",
        "description": "test of a word",
        "year": 2023,
        "state": "state test",
        "userId": "64b9d284373eabc3ecb747d3",
        "username": "usertest"
    })
    it("Should call the schema and return the correct name of the words", ()=>{
        expect(words.word).toBe("words test")
    })
    it("Should call the schema and return the correct description of the words", ()=>{
        expect(words.description).toBe("test of a word")
    })
    it("Should call the schema and return the correct year of the words", ()=>{
        expect(words.year).toBe(2023)
    })
    it("Should call the schema and return the correct state of the words", ()=>{
        expect(words.state).toBe("state test")
    })
    it("Should call the schema and return the correct userId of the words", ()=>{
        expect(JSON.stringify(words.userId).substring(1,(JSON.stringify(words.userId)).length-1)).toBe("64b9d284373eabc3ecb747d3")
    })
    it("Should call the schema and return the correct username of the words", ()=>{
        expect(words.username).toBe("usertest")
    })
})

describe("CREATE route test", ()=>{
    const words = new wordsModel({
        "word": "words test",
        "description": "test of a word",
        "year": 2023,
        "state": "state test",
        "userId": "64b9d284373eabc3ecb747d3",
        "username": "usertest"
    })
    it("Should save in the database the new words", ()=>{
        words.save().then((data)=>{
            expect(data.word).toBe("test word")
        })
    })
})

describe("UPDATE route test", ()=>{
    it("Should edit and save in the database the new words", ()=>{
        const words = new wordsModel({
            "word": "words test",
            "description": "test of a word",
            "year": 2023,
            "state": "state test",
            "userId": "64b9d284373eabc3ecb747d3",
            "username": "usertest"
        })
        words.word = "new test word"
        words.save().then((data)=>{
            expect(data.word).toBe("new test word")
        })
    })
})

describe("DELETE route test", ()=>{
    it("Should delete a word", ()=>{
        const words = new wordsModel({
            "word": "words test",
            "description": "test of a word",
            "year": 2023,
            "state": "state test",
            "userId": "64b9d284373eabc3ecb747d3",
            "username": "usertest"
        })
            
        words.save().then((data)=>{
            words.delete().then(()=>{
                expect(data.word).toBe(null)
            })
        })
    })
})
    
    