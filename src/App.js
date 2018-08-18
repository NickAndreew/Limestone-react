import React, { Component } from 'react';
import './App.css';
import Columns from './Columns';
import { Switch, Route, Link } from 'react-router-dom';
import Task from './Task';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';


class App extends Component {

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src="https://limestonedigital.co/wp-content/uploads/2018/02/ls-logo-w-1.svg" className="App-logo" alt="logo" />
					<h1 className="App-title"><Link to="/">TO-DO List</Link></h1>
				</header>
				<div className="App-intro">
					<Switch>
						<Route exact path='/' component={Columns} />
						<Route path='/tasks/:id' component={Task} />
						<Route path='/create-task/' component={CreateTask} />
						<Route path='/update-task/:id' component={UpdateTask} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
