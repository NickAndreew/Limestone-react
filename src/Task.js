import React, { Component } from 'react';
import './Task.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {}
        };

        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    componentDidMount() {

        var id = window.location.href.toString().split("/tasks/");
        console.log(id[1]);

        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/" + id[1],
            method: "get",
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {

            var data = response.data;
            this.setState({
                task: data
            })
            console.log(data);

        }.bind(this));
    }

    handleRemoveClick(e) {
        console.log('this ID is:', e);

        var task = '';
        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/"+e,
            method: "get",
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then(function(response) {

            task = response.data.taskName;
            console.log(task);
            this.removeTask(response);
        }.bind(this));
    }

    removeTask(e){
        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/"+e.data.taskID,
            method: "delete",
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then((response) => response.data)
          .then(data => this.setState({ 
            taskList: data 
        }));

        console.log(e.data.taskName+" has been removed.");
        this.props.router.push('/');
    }

    render() {

        var data = this.state.task;

        return (
            <div className="task">
                <div>
                    <div className="taskDetails">
                        <div className="row">
                            <div className="col-sm-4">
                            </div>
                            <div className="col-sm-4">
                                <h3 className="taskHeader" id="taskName">{data.taskName}</h3>
                            </div>
                            <div className="col-sm-4 ">
                                <div className="glyphs">
                                    <Link to={`/update-task/${data.taskID}`}><span className="glyphicon glyphicon-pencil"></span></Link>
                                    <a onClick={this.handleRemoveClick.bind(this, data.taskID)}>
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="taskDescription" id="taskDescription">{data.taskDescription}</h4>
                    </div>
                    <div>
                        <h4 className="taskDescription" id="status">Status : {data.status}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;