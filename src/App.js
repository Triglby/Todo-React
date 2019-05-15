import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get(`/api/get`)
    .then(res => this.setState({ todos: res.data }));
  }

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`/api/delete/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // Toggle 
  toggleComplete = (id) => {
    axios.put(`/api/update/${id}`)
    .then(this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.taskDone = !todo.taskDone
      } 
      return todo;
    }) }));

  }

  // Add 
  addTodo = (taskDesc) => {
    axios.post(`/api/add`, { taskDesc })
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}))
    .then(axios.get(`/api/get`)
    .then(res => this.setState({ todos: res.data })));
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} toggleComplete={this.toggleComplete}
                delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
