import { createSlice } from "@reduxjs/toolkit";

const tasksInitialState = {
  value: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.value = state.value.filter(
        (task) => task.cardID !== action.payload
      );
    },
    moveCardToAnotherList: (state, action) => {
      const { cardID, sourceListID, destinationListID } = action.payload;
      const cardIndex = state.value.findIndex((task) => task.cardID === cardID);

      if (cardIndex !== -1) {
        state.value[cardIndex].listID = destinationListID;

        if (sourceListID && sourceListID !== destinationListID) {
          const sourceList = state.value.filter((task) => task.listID === sourceListID);
          const sourceListIndex = state.value.findIndex((task) => task.listID === sourceListID);
          const sourceCardIndex = sourceList.findIndex((task) => task.cardID === cardID);

          if (sourceCardIndex !== -1) {
            sourceList.splice(sourceCardIndex, 1);
          }
          state.value.splice(sourceListIndex, 1, sourceList)
        }
      }
    },

  },
});

export const { addTask, deleteTask, moveCardToAnotherList } = tasksSlice.actions;
export default tasksSlice.reducer;
