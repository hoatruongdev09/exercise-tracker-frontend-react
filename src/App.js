import { React } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ExercisesList from './components/exercises-list.component'
import EditExercise from './components/edit-exercise.component'
import CreateExercise from './components/create-exercise.component'
import CreateUser from './components/create-user.component'
import Navbar from './components/navbar.component'
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
        <Route path="/" exact component={ExercisesList}></Route>
        <Route path="/edit/:id" exact component={EditExercise}></Route>
        <Route path="/create" exact component={CreateExercise}></Route>
        <Route path="/user" exact component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
