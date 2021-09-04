import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	taskLists: [],
	badTaskLists: [],
	status: "",
	message: "",
	isPending: false,
	totalHrs: 0,
};
const taskSlice = createSlice({
	name: "taskList",
	initialState,
	reducers: {
		//update state when is pending
		requestPending: state => {
			state.isPending = true;
		},

		//update state when response is success
		addTaskSuccess: (state, { payload }) => {
			console.log(payload, "from slice");
			state.status = payload.status;
			state.message = payload.message;
			state.isPending = false;
		},

		//fetch all task and update state
		fetchTasksSuccess: (state, { payload }) => {
			state.isPending = false;

			state.totalHrs = payload.reduce((subttl, itm) => subttl + +itm.hr, 0);
			const taskListsOnly = payload.filter(item => item.todo);
			state.taskLists = taskListsOnly;

			//bad list only
			const badTaskListsOnly = payload.filter(item => !item.todo);
			state.badTaskLists = badTaskListsOnly;
		},

		//update state when response is fail
		requestFail: (state, action) => {
			state.isPending = false;
		},
	},
});

const { reducer, actions } = taskSlice;

export const {
	requestPending,
	addTaskSuccess,
	requestFail,
	fetchTasksSuccess,
} = actions;

export default reducer;
