import {
	requestPending,
	addTaskSuccess,
	requestFail,
	fetchTasksSuccess,
} from "./taskSlice";
import { createTask, getTaskLists } from "../../apis/taskApi";

export const addTask = newTask => async dispatch => {
	try {
		// call add task api
		dispatch(requestPending());

		const result = await createTask(newTask);

		//new task has been added success fully, now we can call api to fetch all the data
		dispatch(addTaskSuccess(result));
		result.status === "success" && dispatch(fetchTaskLists());
	} catch (error) {
		dispatch(
			requestFail({
				status: "error",
				message: error.message,
			})
		);
	}
};

//fetch all the ticket and update in the redux store
export const fetchTaskLists = () => async dispatch => {
	try {
		dispatch(requestPending());

		const { result } = await getTaskLists();
		dispatch(fetchTasksSuccess(result));
	} catch (error) {
		dispatch(
			requestFail({
				status: "error",
				message: error.message,
			})
		);
	}
};
