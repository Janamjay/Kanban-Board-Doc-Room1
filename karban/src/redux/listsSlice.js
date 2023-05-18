import { createSlice, current } from "@reduxjs/toolkit";

const listsInitialState = {
  value: [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState: listsInitialState,
  reducers: {
    addList: (state, action) => {
      state.value.push({
        listID: action.payload.id,
        listTitle: action.payload.title,
        cards: action.payload.cards,
      });
    },
    deleteList: (state, action) => {
      state.value = state.value.filter(
        (item) => item.listID !== action.payload
      );
    },
    updateTitle: (state, action) => {
      const { listID, listTitle } = action.payload;
      const index = state.value.findIndex((item) => item.listID === listID);

      if (index !== -1) {
        state.value[index].listTitle = listTitle;
      }
    },
    reorderCards: (state, action) => {
      // console.log(action.payload)
      const curState=current(state)
      console.log(curState)

      const { listID, startIndex, endIndex } = action.payload;
      let requiredList= curState.value.find((list) => list.listID === listID);
      console.log(requiredList.cards)
      const requiredListIndex= curState.value.findIndex((list) => list.listID === listID);
      console.log(requiredListIndex)


      const temp=requiredList.cards[startIndex]
      console.log(temp, "temp")
      requiredList.cards[startIndex]=requiredList.cards[endIndex]
      requiredList.cards[endIndex]=temp

      // const [removedCard] = cards.splice(startIndex, 1);
      // cards.splice(endIndex, 0, removedCard);

      state.value.splice(requiredListIndex, 1, requiredList)
    }
  },
});

export const { addList, deleteList, updateTitle, reorderCards } = listsSlice.actions;
export default listsSlice.reducer;
