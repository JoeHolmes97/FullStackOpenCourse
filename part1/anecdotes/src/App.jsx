import { useState } from 'react'

// Display the anecdote selected
const DisplayAnecdotes = ({text, anecdotes, selected, votes }) => {
    return (
        <div>
            <h1>{text}</h1>

            <p>{anecdotes[selected]}</p>
            <p>This anecdote has {votes[selected]} votes</p>
        </div>
    )
}
// Display a button
const Button = ({onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    // Generate a random number with a max value
    const randomNumber = (max) => {
        return (
            Math.floor(Math.random() * (max))
        )
    }

    const [selected, setSelected] = useState(randomNumber(anecdotes.length))
    // Empty array for the votes, and setting a hook for the votes
    let initialVotes = new Array(8).fill(0)
    const [votes, setVotes] = useState(initialVotes)

    // Change {selected} to a random value, with the max being the length of {anecdotes}
    const randomSelect = (set) => {
        let rand = randomNumber(anecdotes.length)
        if (rand === selected) {
            rand = randomNumber(anecdotes.length)
        }
        set(rand)
    }
    // Increase the vote count of the current anecdote by 1
    const Vote = (selected) => {
        const increaseCount = votes.map((init, index) => {
            if (index === selected) {
                return init + 1
            } else {
                return init
            }
        })
        setVotes(increaseCount)
    }
    // Function to find the index of the anecdote with the most votes
    const mostVotes = (votes) => {
        const most = Math.max(...votes)
        return votes.indexOf(most)
    }

    return (
        <div>
            <DisplayAnecdotes text='Anecdote of the day' anecdotes={anecdotes} selected={selected} votes={votes} />           
            <Button onClick={() => Vote(selected)} text='Vote' />            
            <Button onClick={() => randomSelect(setSelected)} text='Next Anecdote' />
            <DisplayAnecdotes text='Anecdote with the most votes' anecdotes={anecdotes} selected={mostVotes(votes)} votes={votes} />
        </div>
    )
}

export default App