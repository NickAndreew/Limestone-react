import React, { Component } from 'react';
import './Task.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class UpdateTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {}
		};

		this.handleUpdateTaskClick = this.handleUpdateTaskClick.bind(this);
	}

	componentDidMount() {

		var id = window.location.href.toString().split("/update-task/");
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

			document.getElementById("name").value = data.taskName;
			document.getElementById("description").value = data.taskDescription;
			document.getElementById("status").value = data.status;

		}.bind(this));
	}


	handleUpdateTaskClick() {
		var name = document.getElementById("name").value;
		var description = document.getElementById("description").value;
		var status = document.getElementById("status").value;

		var id = this.state.task.taskID;

		Axios({
			url: "https://limestone-tasks-assignment.herokuapp.com/tasks/",
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache",
				'Access-Control-Allow-Origin': '*'
			},
			data: {
				taskID: id,
				taskName: name,
				taskDescription: description,
				status: status
			}
		}).then(function (response) {
			alert(name+" has been updated!");
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
						<h3 className="taskHeader">Update Task</h3>
					</div>
					<div className="col-sm-4">
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" className="form-control" id="name" maxLength="25" ></input>

					<label htmlFor="description">Description:</label>
					<textarea className="form-control" rows="6" id="description" maxLength="750"></textarea>

					<label htmlFor="status">Set Status:</label>
					<select className="form-control" id="status">
						<option value="TODO">TO-DO</option>
						<option value="PENDING">PENDING</option>
						<option value="DONE">DONE</option>
					</select>
					<div className="buttons">
						<Link className="button" to='/'><button>Cencel</button></Link>
						<button className="submit" onClick={this.handleUpdateTaskClick}>Update Task</button>
					</div>

				</div>


			</div>
		);
	}
}

export default UpdateTask;