const express = require('express')
var fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

var words = [];

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to FREE English Dictionary API',
        endpoints: [
            {
                name: "/words",
                parameters: [
                  "lenght",
                  "count"
                ]
            }
        ]
    })
})

app.get('/words', (req, res) => {

    const { length, count } = req.query

    res.status(200).send({
        words: getWordOnStart(length, count)
    })

})

function getWordOnStart(length, count) {

    try {  
        var data = fs.readFileSync('dictionary.txt', 'utf8');
        
        const wordsResponse = data.split('\n')
        
        words = wordsResponse;

        if (length && count) {
            // filter words based on length and return list based on count
            const filteredWords = words.filter(word => word.length === parseInt(length))
            const randomIndex = Math.floor(Math.random() * 35000)
            const wordsToReturn = filteredWords.slice(randomIndex, randomIndex + parseInt(count))
            return wordsToReturn
        }
        else if(length) {
            // filter words based on length and return list
            const filteredWords = words.filter(word => word.length === parseInt(length))
            return filteredWords
        }
        else if (count) {
            // return list based on count
            const randomIndex = Math.floor(Math.random() * 350000)
            const wordsToReturn = words.slice(randomIndex, randomIndex + parseInt(count))
            return wordsToReturn
        }
        else {
            return words
        }

        console.log(words)

    } catch(e) {
        console.log('Error:', e.stack);
    }

}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)

    getWordOnStart();
})