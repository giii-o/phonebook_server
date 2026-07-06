const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "020-53333333333",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppins ",
      "number": "1111111111111111111111",
      "id": "4"
    },
    {
      "name": "Candy apples",
      "number": "77777777777777",
      "id": "5"
    }
]

app.get('/', (req , res) => {
    res.send('Hello lego city')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const selectedPerson = persons.find(p => p.id === id)
    res.json(selectedPerson)
})

const genId = () => {
    const existingID = persons.map(p => Number(p.id))
    const newNum = Math.floor(Math.random()*99) + 1

    if(existingID.includes(newNum)){
        genId()
    }else{
        return newNum
    }
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    const newPerson = {
        name: body.name,
        number: body.number,
        id: genId()
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})

app.delete('/api/persons/:id', (req , res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    const newPerson = {
        name: body.name,
        number: body.number,
        id: id
    }

    persons = persons.map(p => p.id === id ? newPerson : p)
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('This server has started at:', PORT)
})