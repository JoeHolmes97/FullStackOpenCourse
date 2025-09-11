import { useState, useEffect } from 'react'
//import axios from 'axios'
import noteService from './services/notes'


const DisplayPeople = ({ persons, filter, delBut, setDeleted }) => {

    const numbersToShow = (filter==='')
        ? persons
        : persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <table>
                <tbody>
                    {numbersToShow.map(persons =>
                        <Numbers key={persons.id} persons={persons} delBut={delBut} setDeleted={setDeleted} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const Numbers = ({ persons, delBut, setDeleted }) => {
    const deleteNum = () => {
        //console.log(persons)
        if (window.confirm(`Delete ${persons.name}?`)) {
            noteService
                .deleteNumber(persons.id)
                .then(response => {
                    setDeleted(response.id)
                    console.log(response.name, 'has been removed')
                })
        }
    }
    return (
        <tr>
            <td>
                {persons.name}                
            </td>
            <td>
                {persons.number}
            </td>
            <td>
                {delBut && <button onClick={() => deleteNum()}>Delete</button>}
            </td>
        </tr>
    )
}

const AddNumber = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber }) => {

    const handleInputChange = (set, event) => {
        //console.log(event.target.value)
        set(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        console.log('Button clicked', event.target)

        const nameObject = {
            name: newName,
            number: newNumber,
        }

        if (newName === '' || newNumber === '') {
            return (alert(`Please fill both inputs`))
        }
        console.log(newName)
        if (persons.some(item => item.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const updateId = (persons.find(item => item.name === newName)).id
                noteService
                    .updateNumber(updateId, nameObject)
                    .then(returnedNum => {
                        setPersons(persons.map(persons => persons.id === updateId ? returnedNum : persons))
                    })
                return

            } else {
                return (alert('Please enter a different name'))
            }
        }

        noteService
            .newNumber(nameObject)
            .then(returnedNum => {
                setPersons(persons.concat(returnedNum))
                console.log(returnedNum)
                setNewName('')
                setNewNumber('')
            })
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input value={newName} onChange={(event) => handleInputChange(setNewName, event)}></input>
            </div>
            <div>
                Number: <input value={newNumber} onChange={(event) => handleInputChange(setNewNumber, event)}></input>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

const ToggleDeleteButtons = ({ delBut, showDelBut }) => {
    return(
        <div>
            <button onClick={() => showDelBut(!delBut)}>
                Show/Hide delete buttons
            </button>
        </div>
    )
}

const Filter = ({ filter, setFilter }) => {
    const handleFilter = (event) => {
        //console.log(event.target.value)
        setFilter(event.target.value)
    }

    return (
        <div>
            <form>
                Filter shown with: <input value={filter} onChange={handleFilter}></input>
            </form>
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

            <Filter filter={filter} setFilter={setFilter} />

            <h3>Add a new number</h3>
            <AddNumber
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
            />

            <h3>Numbers</h3>
            <DisplayPeople
                persons={persons}
                filter={filter}
                delBut={delBut}
                setDeleted={setDeleted}
            />

            <ToggleDeleteButtons delBut={delBut} showDelBut={showDelBut} />
        </div>
    )
}

export default App