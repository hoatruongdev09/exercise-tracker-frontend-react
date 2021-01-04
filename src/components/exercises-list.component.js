import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Exercise from './exercise.component'
export default class ExercisesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
        this.onDelete = this.onDelete.bind(this)
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data
                })
            }).catch(err => {
                console.log(err)
            })
    }
    onDelete(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => {
                this.setState({
                    exercises: this.state.exercises.filter(ex => ex._id !== id)
                })
            }).catch(err => {

            })
    }
    render() {
        return (
            <div>
                <h3>Exercise List</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Description</td>
                            <td>Duration</td>
                            <td>Date</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.exercises.map(ex => {
                                return <Exercise exercise={ex} onDelete={this.onDelete}></Exercise>
                                // return <tr>
                                //     <td>{ex.username}</td>
                                //     <td>{ex.description}</td>
                                //     <td>{ex.duration}</td>
                                //     <td>{ex.date}</td>
                                //     <td><Link to={`/edit/${ex._id}`}>Edit</Link></td>
                                //     <td><Link to="#">Delete</Link></td>
                                // </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}