import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import ScrollArea from "react-scrollbar";

const scrollStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.445)",
  

}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }
  remove(id) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id)
    });
  }
  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  render() {
    console.log(this.state.todos);
    const todos = this.state.todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          removeTodo={this.remove}
          updateTodo={this.update}
          toggleTodo={this.toggleCompletion}
        />
      );
    });
    return (
      <div className="TodoGrocery">
        <div className="noScroll">
          <h1>
            Grocery List <span>A modern Grocery List</span>
          </h1>
        </div>
        <div className="noScrollAdd">
          <NewTodoForm createTodo={this.create} />
        </div>
        <ScrollArea
          speed={.8}
          className="scroll"
          horizontal={false}
          verticalScrollbarStyle={scrollStyle}
          smoothScrolling={true}
        >
          <ul>{todos}</ul>
        </ScrollArea>
      </div>
    );
  }
}
export default TodoList;
