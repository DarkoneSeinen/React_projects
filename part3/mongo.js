const mongoose = require('mongoose')

// Validar que hay al menos una contraseña en los argumentos
if (process.argv.length < 3) {
  console.log('Por favor proporciona la contraseña como argumento: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:pass1234@cluster0.vbvs3wj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // Mostrar todos los contactos
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // Agregar nuevo contacto
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Uso: node mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}
