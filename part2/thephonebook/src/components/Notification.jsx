
const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    let color;

    if (message === null) {
        color = 'grey'
    } else {
        color = message[1]
    }

    console.log(message[0], color)
    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={style}>
            {message[0]}
        </div>
    )
}

export default Notification