import { useState, useEffect } from 'react'
import noteService from './services/notes'
import DisplayPeople from './components/DisplayPeople'
import AddNumber from './components/AddNumber'
import Filter from './components/Filter'
import Notification from './components/Notification'

const ToggleDeleteButtons = ({ delBut, showDelBut }) => {
    return(
        <div>
            <button onClick={() => showDelBut(!delBut)}>
                Show/Hide delete buttons
            </button>
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [delBut, showDelBut] = useState(false)
    const [deleted, setDeleted] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        noteService
            .getNumbers()
            .then(numbers => {
                setPersons(numbers)
            })
    }, [deleted])


    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} />

            <Filter filter={filter} setFilter={setFilter} />

            <h3>Add a new number</h3>
            <AddNumber
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                setMessage={setMessage}
            />

            <h3>Numbers</h3>
            <DisplayPeople
                persons={persons}
                filter={filter}
                delBut={delBut}
                setDeleted={setDeleted}
                setMessage={setMessage}
            />

            <ToggleDeleteButtons delBut={delBut} showDelBut={showDelBut} />
        </div>
    )
}

export default App