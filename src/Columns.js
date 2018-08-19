import React, { Component } from 'react';
import './Columns.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';


class Columns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        };

        this.removeTask = this.removeTask.bind(this);
    }

    componentDidMount() {
        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/all",
            method: "get",
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.data)
            .then(data => this.setState({
                taskList: data
            }));
    }

    handleRemoveClick(e) {
        console.log('this ID is:', e);

        var task = '';
        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/" + e,
            method: "get",
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {

            task = response.data.taskName;
            if (window.confirm("Do you confirm delete of "+task+" ?")) {
                this.removeTask(response);
            } 

            console.log(task);
            
        }.bind(this));
    }

    removeTask(e) {
        Axios({
            url: "https://limestone-tasks-assignment.herokuapp.com/tasks/" + e.data.taskID,
            method: "delete",
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.data)
            .then(data => this.setState({
                taskList: data
            }));

        alert(e.data.taskName + " has been removed.");
    }

    render() {

        const taskList = this.state.taskList;
        var todoList = [];
        var pendningList = [];
        var doneList = [];

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status === "TODO") {
                todoList.push(taskList[i]);
            } else if (taskList[i].status === "PENDING") {
                pendningList.push(taskList[i]);
            } else if (taskList[i].status === "DONE") {
                doneList.push(taskList[i]);
            }
        }

        return (
            <div>
                <div className="columns">
                    <div className="column">
                        <div className="colTextAndButton">
                            <h3 className="columnHeader">TO-DO</h3>
                            <Link to="/create-task" className="addGlyph"><span className="glyphicon glyphicon-plus" /></Link>
                        </div>
                        <div className="taskList">
                            <ol className="olCl">
                                {
                                    todoList.map(task => {
                                        const { taskID, taskName } = task;
                                        return <li key={taskID} className="taskLi">
                                            <Link to={`/tasks/${taskID}`}>{taskName}</Link>
                                            <a className="removeGlyph" onClick={this.handleRemoveClick.bind(this, taskID)}>
                                                <span className="glyphicon glyphicon-trash"></span>
                                            </a>
                                        </li>;
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="column">
                        <div className="colTextAndButton">
                            <h3 className="columnHeader">PENDING</h3>
                            {/* <a className="addGlyph"><span className="glyphicon glyphicon-plus" /></a> */}
                        </div>
                        <div className="taskList">
                            <ol className="olCl">
                                {
                                    pendningList.map(task => {
                                        const { taskID, taskName } = task;
                                        return <li key={taskID} className="taskLi">
                                            <Link to={`/tasks/${taskID}`}>{taskName}</Link>
                                            <a className="removeGlyph" onClick={this.handleRemoveClick.bind(this, taskID)}>
                                                <span className="glyphicon glyphicon-trash"></span>
                                            </a>
                                        </li>;
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="column">
                        <div className="colTextAndButton">
                            <h3 className="columnHeader">DONE</h3>
                            {/* <a className="addGlyph"><span className="glyphicon glyphicon-plus" /></a> */}
                        </div>
                        <div className="taskList">
                            <ol className="olCl">
                                {
                                    doneList.map(task => {
                                        const { taskID, taskName } = task;
                                        return <li key={taskID} className="taskLi">
                                            <Link to={`/tasks/${taskID}`}>{taskName}</Link>
                                            <a className="removeGlyph" onClick={this.handleRemoveClick.bind(this, taskID)}>
                                                <span className="glyphicon glyphicon-trash"></span>
                                            </a>
                                        </li>;
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Columns;