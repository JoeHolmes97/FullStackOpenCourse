import { useState } from 'react'


const DisplayPeople = ({ persons }) => {

    return (
        <div>
            <table>
                <tbody>
                    {persons.map(persons =>
                        <Numbers key={persons.name} name={persons.name} number={persons.number} />
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

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040-1234567',
        },
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        console.log('Button clicked', event.target)

        if (persons.some(item => item.name === newName)) {
            return(alert(`${newName} is already added to phonebook`))
        }
        if (newName || newNumber === '') {
            return(alert(`Please fill both inputs`))
        }

        const nameObject = {
            name: newName,
            number: newNumber,
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
    }

    const handleInputChange = (set, event) => {
        //console.log(event.target.value)
        set(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            <DisplayPeople persons={persons} />
        </div>
    )
}

export default App