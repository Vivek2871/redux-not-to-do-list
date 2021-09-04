import { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button, Spinner } from "react-bootstrap";
import { AddTaskForm } from "./components/form/AddTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "./components/task-lists/TaskList";
import { NotToDoList } from "./components/task-lists/NotToDoList";
import { AlertMessage } from "./components/messasge/AlertMessage";
import {
	createTask,
	getTaskLists,
	switchTask,
	deleteTasks,
} from "./apis/taskApi";

import { fetchTaskLists } from "./components/task-lists/taskAction";

//

import "./App.css";

const HRPW = 168;
const initialResponse = {
	status: "",
	message: "",
};

const App = () => {
	const dispatch = useDispatch();
	const { isPending, totalHrs } = useSelector(state => state.task);

	const [taskToDelete, setTaskToDelete] = useState([]);

	useEffect(() => {
		dispatch(fetchTaskLists());
	}, []);

	const markAsBadList = async _id => {
		console.log(_id);
		const dt = {
			id: _id,
			todo: false,
		};

		const res = await switchTask(dt);
	};

	const markAsGoodList = async _id => {
		const dt = {
			id: _id,
			todo: true,
		};

		const res = await switchTask(dt);
	};

	// collect indices of the task list that to be deleted
	const handleOnTaskClicked = e => {
		const { checked, value } = e.target;
		if (checked) {
			setTaskToDelete([...taskToDelete, value]);
		} else {
			const filteredArg = taskToDelete.filter(itme => itme !== value);
			setTaskToDelete(filteredArg);
		}
	};

	//delete list form task list and bad list
	const handleOnDeleteItems = async () => {
		//request server to delete items form database

		const { deletedCount } = await deleteTasks({ ids: taskToDelete });
	};

	return (
		<div className="main">
			<Container>
				<Row>
					<Col>
						<h1 className="text-center mt-5">Not To Do Task List</h1>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<AlertMessage />
					</Col>
				</Row>
				<AddTaskForm />
				<hr />
				<Row>
					<Col>
						{isPending && <Spinner animation="border" variant="primary" />}
						<TaskList
							// tasks={tasks}
							// tasks={taskListsOnly}
							markAsBadList={markAsBadList}
							handleOnTaskClicked={handleOnTaskClicked}
							taskToDelete={taskToDelete}
						/>
					</Col>
					<Col>
						<NotToDoList
							markAsGoodList={markAsGoodList}
							handleOnBadTaskClicked={handleOnTaskClicked}
							badTaskToDelete={taskToDelete}
						/>
					</Col>
				</Row>
				<Row className="py-3">
					<Col>
						<Button variant="danger" onClick={handleOnDeleteItems}>
							Delete
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Alert variant="info">
							Your total allocated hours = {totalHrs} / 168 hours per week
						</Alert>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default App;
