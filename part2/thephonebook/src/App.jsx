import { useState } from 'react'


const DisplayPeople = ({ persons }) => {

    return (
        <div>
            <table>
                <tbody>
                    {persons.map(persons =>
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



const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>

            {/*Filter goes here*/}

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
            <DisplayPeople persons={persons} />
        </div>
    )
}

export default App