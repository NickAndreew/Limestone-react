import React, { Component } from 'react';
import './Task.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.handleCreateTaskClick = this.handleCreateTaskClick.bind(this);
    }


    handleCreateTaskClick() {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var status = document.getElementById("status").value;

        console.log(name);
        console.log(description);

        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                taskName: name,
                taskDescription: description,
                status: status
            }
        }).then(function (response) {

            this.props.history.push('/');

        }.bind(this));
    }

    render() {
        return (
            <div className="task">
                <div className="row">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        <h3 className="taskHeader">Create Task</h3>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" maxLength="35" ></input>

                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" rows="6" id="description" maxLength="750"></textarea>

                    <label htmlFor="status">Set Status:</label>
                    <select className="form-control" id="status">
                        <option value="TODO">TO-DO</option>
                        <option value="PENDING">PENDING</option>
                        <option value="DONE">DONE</option>
                    </select>

                    <div className="buttons">
                        <Link to="/"><button>Cencel</button></Link>
                        <button onClick={this.handleCreateTaskClick}>Create Task</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTask;