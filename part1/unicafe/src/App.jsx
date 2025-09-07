import { useState } from 'react'


const Button = ({ onClick, text }) => {
    // Render button
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Statistics = ({ good, neutral, bad, all }) => {
    // Calculate average
    const average = () => {
        const aver = (good - bad) / all
        return aver
    }
    // Calcualte positive
    const positive = () => {
        const pos = ((good / all)*100) + '%'
        return pos
    }
    // If there's no feedback yet, display this instead of table
    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    // Render statistics table
    return (
        <div>  
            <table>
                <thead>
                    <tr>
                        <th colSpan='2'><h1>Statistics</h1></th>
                    </tr>
                </thead>
                <tbody>
                    <StatisticLine text='Good' value={good} />
                    <StatisticLine text='Neutral' value={neutral} />
                    <StatisticLine text='Bad' value={bad} />
                    <StatisticLine text='All' value={all} />
                    <StatisticLine text='Average' value={average()} />
                    <StatisticLine text='Positive' value={positive()} />
                </tbody>
            </table>
        </div>
    )
}
// Function to add a row to the statistic table
const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    // Save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    // Function to increase number of clicks for given value (good, neutral, bad)
    const handleClicks = (set, value) => {
        setAll(all + 1)
        set(value + 1)
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            
            <Button onClick={() => handleClicks(setGood, good)} text='Good' />
            <Button onClick={() => handleClicks(setNeutral, neutral)} text='Neutral' />
            <Button onClick={() => handleClicks(setBad, bad)} text='Bad' />

            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
            />
        </div>
    )
}



export default App