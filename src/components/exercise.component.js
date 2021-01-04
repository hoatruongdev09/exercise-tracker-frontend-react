import { Link } from "react-router-dom"


function Exercise(props) {
    let exercise = props.exercise
    let onDelete = props.onDelete
    return <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.date}</td>
        <td><Link to={`/edit/${exercise._id}`}>Edit</Link></td>
        <td><Link onClick={() => { onDelete(exercise._id) }}>Delete</Link></td>
    </tr>
}

export default Exercise