const boxers = require('../data')

class Boxer {
    constructor(data) {
        this.name = data.name
        this.weight = data.weight
        this.style = data.style
        this.id = data.id
        this.stance = data.stance
        this.wins = data.wins
    }

    static get all() {
        return boxers.map(boxerData => new Boxer(boxerData))
    }

    static async findById(boxerId) {
        try {
            const boxer = boxers.find(b => b.id === boxerId)
            return new Boxer(boxer)
        } catch (error) {
            throw new Error('Boxer not found')
        }
    }

    static async create(data) {
        try {
          let nextId
          boxers.length
            ? nextId = boxers.reduce((b1, b2) => b1.id > b2.id ? b1 : b2).id + 1
            : nextId = 1

          if (!data.name || !data.weight || !data.style || !data.stance || !data.wins) {
            throw new Error('You need both a name, weight, style, stance and wins')
          }
    
          const newBoxer = new Boxer({ id: nextId, ...data })
          boxers.push(newBoxer)
          return newBoxer
    
        } catch (error) {
          throw (error.message)
        }
      }

      async update(data) {
        const boxer = boxers.find(q => q.id === this.id)
    
        if (boxer) {
          if (data.name) boxer.name = data.name
          if (data.weight) boxer.weight = data.weight
          if (data.weight) boxer.weight = data.weight
          if (data.style) boxer.style = data.style
          if (data.stance) boxer.stance = data.stance
          return new Boxer(boxer)
        } else {
          throw new Error('Boxer not found')
        }
      }
    
      async destroy() {
        const boxer = boxers.find(b => b.id === this.id)
    
        if (boxer) {
          const boxerIdx = boxers.indexOf(boxer)
          boxers.splice(boxerIdx, 1)
        } else {
          throw new Error('Boxer not found')
        }
      }
    

}

module.exports = Boxer