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
    res.send("Welcome to the Boxer API")
  })
  
app.get('/boxers', (req, res) => {
    res.send(boxers)
})

app.get('/boxers/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const boxer = boxers.find(boxer => boxer.name.toLowerCase() === name)
    if (boxer === undefined) {
      res.status(404).send({ error: `Boxer: ${name} not found :(`})
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

app.patch("/boxers/:name", (req, res) => {
    const boxer = boxers.find(boxer => boxer.name.toLowerCase() === req.params.name.toLowerCase());
  
    if (boxer === undefined) {
      return res.status(404).send({error: "boxer does not exist"})
    }
  
    try {
      const updatedBoxer = { ...req.body, name: capitalise(req.body.name), id: boxer.id}
  

      const idx = boxers.findIndex(f => f.id === boxer.id);
      console.log(idx)
      boxers[idx] = updatedBoxer;
      console.log(boxers[idx])
      res.send(updatedBoxer)
    } catch (error) {
      res.status(400).send(error.message)
    }
})

app.delete("/boxers/:name", (req, res) => {

    const name = req.params.name.toLowerCase();
  
    const boxerIndex = boxers.findIndex(boxer => boxer.name.toLowerCase() === name);
  
    if (boxerIndex === -1) {
      res.status(404).send({ error: "boxer does not exist" })
    } else {
      boxers.splice(boxerIndex, 1);
  
      res.status(204).send()
    }
})


module.exports = app;