import React from "react";
import { useSelector } from "react-redux";
import { Table, Button, Alert } from "react-bootstrap";

export const NotToDoList = ({
	markAsGoodList,
	handleOnBadTaskClicked,
	badTaskToDelete,
}) => {
	const { badTaskLists } = useSelector(state => state.task);
	const badHours = badTaskLists.reduce((subTtl, item) => subTtl + item.hr, 0);
	return (
		<div>
			<h2>Bad Task List</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{badTaskLists.map((itm, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									checked={badTaskToDelete.includes(itm._id)}
									defaultValue={itm._id}
									onChange={handleOnBadTaskClicked}
								/>{" "}
								<label>{itm.task}</label>
							</td>
							<td>{itm.hr}</td>
							<td>
								<Button onClick={() => markAsGoodList(itm._id)}>
									Mark AS Good
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Alert variant="warning">You have save = {badHours} hours per week</Alert>
		</div>
	);
};
