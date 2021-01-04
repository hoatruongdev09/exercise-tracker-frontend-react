import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()
        const user = { username: this.state.username }
        this.setState({ username: '' })
        console.log(user)
        axios.post('http://localhost:5000/users', user)
            .then(res => console.log(res.data))
            .catch(err => { console.log(err) })
    }
    render() {
        return (
            <div>
                <h3>Create new User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type='text' required className="form-control"
                            value={this.username} onChange={this.onChangeUsername}></input>
                    </div>
                    <div className="form-group">
                        <input type='submit' value="Create New User" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}