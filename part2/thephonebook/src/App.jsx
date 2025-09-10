import { useState, useEffect } from 'react'
import axios from 'axios'


const DisplayPeople = ({ persons, filter }) => {

    const numbersToShow = (filter==='')
        ? persons
        : persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <table>
                <tbody>
                    {numbersToShow.map(persons =>
                        <Numbers key={persons.id} name={persons.name} number={persons.number} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const Numbers = ({ name, number }) => {
    //console.log({ name }, {number})
    return (
        <tr>
            <td>
                {name}                
            </td>
            <td>
                {number}
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

        if (newName === '' || newNumber === '') {
            return (alert(`Please fill both inputs`))
        }
        console.log(newName)
        if (persons.some(item => item.name === newName)) {
            return (alert(`${newName} is already added to phonebook`))
        }

        const nameObject = {
            name: newName,
            number: newNumber,
            id: (persons.length)+1
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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

    const loadPersons = () => {
        console.log('Loading persons')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    useEffect(loadPersons, [])

    return (
        <div>
            <h2>Phonebook</h2>

            {/*Filter goes here*/}
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
            <DisplayPeople persons={persons} filter={filter} />
        </div>
    )
}

export default App