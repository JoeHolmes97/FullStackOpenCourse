
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const newNumber = newNum => {
    const request = axios.post(baseUrl, newNum)
    return request.then(response => response.data)
}

const deleteNumber = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then('Confirmed')
}


export default { getNumbers, newNumber, deleteNumber }