
// Component for rendering the courses
const Course = ({ course }) => {

    return (
        <div>

             {course.map(course =>
                <Content key={course.id} parts={course.parts} title={course.name} />
            )}

        </div>
    )
}
// Subcomponent for rendering the content of the course (parts and total)
const Content = ({ parts, title }) => {

    const total = () => {
        //Copy the {exercises} part of the array into a new array
        const exercises = parts.map(({ exercises }) => exercises)
        // Reduce the array of exercises to get the total number
        return exercises.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        )
    }

    return (
        <div>

            <h2>{title}</h2>

            <ul>
                {parts.map(parts =>
                    < Parts key={parts.id} parts={parts} />
                )}
                <li>Total of {total()} exercises</li>
            </ul>
        </div>
    )
}
// Subcomponent for rendering the parts as list items
const Parts = ({ parts }) => {
    return (
        <li>
            {parts.name}: {parts.exercises}
        </li>
    )
}

    export default Course