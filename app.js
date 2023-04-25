const express = require('express')
const cors = require('cors')

const logger = require("./logger");
const boxers = require('./boxers.json')
const { capitalise } = require('./helpers')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.send("Welcome to the Boxer API ")
  })
  
app.get('/boxers', (req, res) => {
    res.send(boxers)
})

app.get('/boxers/:id', (req, res) => {
  const id = req.params.id
  const boxer = boxers.find(boxer => boxer.id == id)
  if (boxer === undefined) {
    res.status(404).send({ error: `Boxer: ${id} not found :(`})
  }
  res.send(boxer)
})

app.post('/boxers', (req, res) => {

    const ids = boxers.map(boxer => boxer.id)
    let maxId = Math.max(...ids)

    const boxer = boxers.find(boxer => boxer.name === req.body.name)

    if (boxer !== undefined) {
      res.status(409).send({error: "Boxer already exists"})
    } else {
      maxId += 1
      const newBoxer = req.body
      newBoxer.id = maxId
  
      boxers.push(newBoxer)
  
      res.status(201).send(newBoxer)
    }
})


app.patch("/boxers/:id", (req, res) => {
  const boxer = boxers.find(boxer => boxer.id == req.params.id);

  if (boxer === undefined) {
    return res.status(404).send({error: "boxer does not exist"})
  }

  try {
    const updatedBoxer = { ...req.body, id: req.body.id, id: boxer.id}


    const idx = boxers.findIndex(f => f.id === boxer.id);
    console.log(idx)
    boxers[idx] = updatedBoxer;
    console.log(boxers[idx])
    res.send(updatedBoxer)
  } catch (error) {
    res.status(400).send(error.message)
  }
})


app.delete("/boxers/:id", (req, res) => {

    const id = req.params.id;
  
    const boxerIndex = boxers.findIndex(boxer => boxer.id == id);
  
    if (boxerIndex === -1) {
      res.status(404).send({ error: "boxer does not exist" })
    } else {
      boxers.splice(boxerIndex, 1);
  
      res.status(204).send()
    }
})


module.exports = app;