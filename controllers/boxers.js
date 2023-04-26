const Boxer = require('../models/Boxer')

const index = async (req, res) => {
    const boxers = await Boxer.all
    res.send(boxers)
}

const show = async (req, res) => {
    try {
      const boxerId = parseInt(req.params.id)
      const boxer = await Boxer.findById(boxerId)
      res.send(boxer)
    } catch (err) {
      res.status(404).send({ error: err.message })
    }
}

const create = async (req, res) => {
    try {
      const newBoxer = await Boxer.create(req.body)
      res.status(201).send(newBoxer)
    } catch (err) {
      res.status(422).json({ err })
    }
}

const destroy = async (req, res) => {
    try {
      const boxerId = parseInt(req.params.id)
      const boxer = await Boxer.findById(boxerId)
      await boxer.destroy()
      res.sendStatus(204)
    } catch (err) {
      res.status(404).send({ error: err.message })
    }
}

const update = async (req, res) => {
    if (!req.body.name && !req.body.age) {
      return res.status(422).send({ error: 'You at least need to update the text or the author' })
    }
  
    try {
      const id = parseInt(req.params.id)
      const data = req.body
      const boxer = await Boxer.findById(id)
      const updatedBoxer = await boxer.update(data)
      res.status(200).json(updatedBoxer)
    } catch (err) {
      res.status(404).send({ error: err.message })
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}