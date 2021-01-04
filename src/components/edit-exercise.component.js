import Axios from 'axios'
import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
export default class EditExercises extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exerciseId: this.props.match.params.id,
            users: [],
            username: '',
            duration: '',
            description: '',
            date: '',
            id: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.state.exerciseId)
            .then(res => {
                console.log("data: ", res.data)
                this.setState({
                    username: res.data.username,
                    duration: res.data.duration,
                    description: res.data.description,
                    date: new Date(res.data.date),
                    id: res.data._id,
                })
            }).catch(err => {
                console.log(err)
                // window.location = '/'
            })
        axios.get('http://localhost:5000/users/')
            .then(res => {
                this.setState({
                    users: res.data
                })
                console.log("receive user")
            }).catch(err => {
                this.setState({
                    users: ['test user']
                })
            })

    }
    onSubmit(e) {
        // e.preventDefault()
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        axios.post('http://localhost:5000/exercises/update/' + this.state.id, exercise)
            .then(res => {
                window.location = '/'
            })
            .catch(err => {
                window.location = '/'
            })
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    render() {
        console.log("Render")
        return (
            <div>
                <h3>Edit Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select required className='form-control' onChange={this.onChangeUsername}>
                            {this.state.users.map(user => {
                                return <option key={user.username} selected={user.username === this.state.username} value={this.state.username}>{user.username}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type='text' required className='form-control' value={this.state.description} onChange={this.onChangeDescription}></input>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input type='number' required className='form-control' value={this.state.duration} onChange={this.onChangeDuration}></input>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}></DatePicker>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value='Update Exercise Log' className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}