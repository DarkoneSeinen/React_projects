import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './Notification' // Asegúrate de tener este import
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null) // Nuevo estado

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            showNotification(`Updated ${newName}'s number`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showNotification(`Error: info of ${newName} was already removed`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }

      return
    }

    const newPerson = { name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        showNotification('Error adding person')
        console.error(error)
      })
  }

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (!confirmDelete) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Deleted ${name}`)
      })
      .catch(() => {
        showNotification(`Error: ${name} was already removed`)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <div>
        filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map(p => (
          <li key={p.id}>
            {p.name} {p.number}{' '}
            <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
