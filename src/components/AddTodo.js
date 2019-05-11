import React, { Component } from 'react'
import { throwStatement } from '@babel/types';

export class AddTodo extends Component {
    state = {
        taskDesc: ''
    }

    onChange = (e) => this.setState({ [e.target.name]:
        e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.taskDesc);
        this.setState({ taskDesc: ''});
    }

    render() {
    return (
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
            <input 
                type="text" 
                name="taskDesc" 
                style={{ flex: '10', padding: '5px' }}
                placeholder = "Add Todo..."
                value={this.state.taskDesc}
                onChange={this.onChange}
                />
            <input
                type="submit"
                value="Submit"
                className="btn"
                style={{ flex: '1'}}
            />
        </form>
    )
  }
}

export default AddTodo
