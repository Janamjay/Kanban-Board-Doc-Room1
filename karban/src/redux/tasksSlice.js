import { createSlice, current } from "@reduxjs/toolkit";

const tasksInitialState = {
  value: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
      // console.log(state.value.length)
      // console.log(current(state))
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
          const sourceListIndex = state.value.findIndex((task) => task.listID === sourceListID);
          const sourceCardIndex = sourceList.findIndex((task) => task.cardID === cardID);

          if (sourceCardIndex !== -1) {
            sourceList.splice(sourceCardIndex, 1);
          }
          state.value.splice(sourceListIndex, 1, sourceList)
        }
      }
    },
    reorderCards: (state, action) => {
      console.log(action.payload)
      const curState=current(state)
      console.log(curState)

      const { targetListID, startIndex, endIndex } = action.payload;
      const requiredList= current(state).value.find((list) => list.listID === targetListID);
      console.log(requiredList)
      const requiredListIndex= state.value.findIndex((list) => list.listID === targetListID);
      // console.log(requiredListIndex)


      const temp=requiredList.cards[startIndex]
      // const temp=requiredList.cards.splice(startIndex,1)

      // console.log(temp, "temp")
      requiredList.cards[startIndex]=requiredList.cards[endIndex]
      // temp.splice(endIndex, 1, )
      requiredList.cards[endIndex]=temp

      // const [removedCard] = cards.splice(startIndex, 1);
      // cards.splice(endIndex, 0, removedCard);

      state.value.splice(requiredListIndex, 1, requiredList)
    }
  },
});

export const { addTask, deleteTask, moveCardToAnotherList, reorderCards } = tasksSlice.actions;
export default tasksSlice.reducer;
