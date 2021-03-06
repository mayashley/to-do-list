import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateList = this.updateList.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleRemove() {
    this.props.removeTodo(this.props.id);
  }
  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  updateList(evt) {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleToggle(evt) {
    this.props.toggleTodo(this.props.id);
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="FormTodoEdit">
          <form className="Todo-edit-form" onSubmit={this.updateList}>
            <input
              type="text"
              value={this.state.task}
              name="task"
              onChange={this.handleChange}
            />
            <button>
              <i className="fas fa-check-square"></i>
            </button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="FormTodo">
          <li
            className={this.props.completed ? "TodoTask completed" : "TodoTask"}
            onClick={this.handleToggle}
          >
            {this.props.task}
          </li>
          <div className="Todo-Buttons">
            <button onClick={this.toggleForm}>
              <i className="fas fa-pen-square"></i>
            </button>
            <button onClick={this.handleRemove}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      );
    }
    return result;
  }
}
export default Todo;
