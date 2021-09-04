import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const TaskList = ({
	markAsBadList,
	handleOnTaskClicked,
	taskToDelete,
}) => {
	const { taskLists } = useSelector(state => state.task);
	return (
		<div>
			<h2>Task List</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{taskLists.map((itm, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={itm._id}
									checked={taskToDelete.includes(itm._id)}
									onChange={handleOnTaskClicked}
								/>{" "}
								<label>{itm.task}</label>
							</td>
							<td>{itm.hr}</td>
							<td>
								<Button onClick={() => markAsBadList(itm._id)}>
									Mark AS Bad
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
