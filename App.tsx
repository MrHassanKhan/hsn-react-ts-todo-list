import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Task } from "./models/task";
import { NewTaskForm } from "./components/NewTaskForm";
import { TasksList } from "./components/TasksList";

interface State {
  newTask: Task;
  tasks: Task[];
}

class App extends Component<{}, State> {
  state = {
    newTask: {
      id: 1,
      name: ""
    },
    tasks: []
  };

  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/tasklist">Task List</Link>
            </li>
            <li>
              <Link to="/newtask">New Task</Link>
            </li>
            <li>
              <Link to="/edittask">Edit Task</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/newtask">
            <NewTaskForm
              task={this.state.newTask}
              onAdd={this.addTask}
              onChange={this.handleTaskChange}
            />
          </Route>
          <Route path="/tasklist">
            <TasksList tasks={this.state.tasks} onDelete={this.deleteTask} /> 
          </Route>
          <Route path="/">
            
          </Route>
        </Switch>
      </div>
    </Router>
    

      // <div>
      //   <h2>Hello React TS!</h2>
      //   <NewTaskForm
      //     task={this.state.newTask}
      //     onAdd={this.addTask}
      //     onChange={this.handleTaskChange}
      //   />
      //   <TasksList tasks={this.state.tasks} onDelete={this.deleteTask} />
      // </div>
    );
  }

  private addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => ({
      newTask: {
        id: previousState.newTask.id + 1,
        name: ""
      },
      tasks: [...previousState.tasks, previousState.newTask]
    }));
  };

  private handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        name: event.target.value
      }
    });
  };

  private deleteTask = (taskToDelete: Task) => {
    this.setState(previousState => ({
      tasks: [
        ...previousState.tasks.filter(task => task.id !== taskToDelete.id)
      ]
    }));
  };
}

export default App;