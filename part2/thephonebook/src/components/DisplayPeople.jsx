
import noteService from '../services/notes'

const DisplayPeople = ({ persons, filter, delBut, setDeleted, setMessage }) => {

    const numbersToShow = (filter==='')
        ? persons
        : persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <table>
                <tbody>
                    {numbersToShow.map(persons =>
                        <Numbers
                            key={persons.id}
                            persons={persons}
                            delBut={delBut}
                            setDeleted={setDeleted}
                            setMessage={setMessage}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const Numbers = ({ persons, delBut, setDeleted, setMessage }) => {
    const deleteNum = () => {
        //console.log(persons)
        if (window.confirm(`Delete ${persons.name}?`)) {
            noteService
                .deleteNumber(persons.id)
                .then(response => {
                    setDeleted(response.id)
                    console.log(response.name, 'has been removed')
                    setMessage([`${response.name} has been removed`, 'green'])
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
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

export default DisplayPeople