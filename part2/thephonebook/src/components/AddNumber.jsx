import noteService from '../services/notes'


const AddNumber = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber, setMessage }) => {

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
                    .catch(() => {
                        setMessage([`${newName} was already removed from the server`, 'red'])
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id != updateId))
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
                setMessage([`Added ${nameObject.name}`, 'green'])
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
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

export default AddNumber