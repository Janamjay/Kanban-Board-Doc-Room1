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
          const sourceCardIndex = sourceList.findIndex((task) => task.cardID === cardID);

          if (sourceCardIndex !== -1) {
            sourceList.splice(sourceCardIndex, 1);
          }
        }
      }
    },
    reorderCards: (state, action) => {
      const { listID, startIndex, endIndex } = action.payload;
      const cards = state.value.filter((task) => task.listID === listID);

      const [removedCard] = cards.splice(startIndex, 1);
      cards.splice(endIndex, 0, removedCard);
    },
  },
});

export const { addTask, deleteTask, moveCardToAnotherList, reorderCards } = tasksSlice.actions;
export default tasksSlice.reducer;
