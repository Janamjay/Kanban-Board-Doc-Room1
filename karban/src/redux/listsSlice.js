import { createSlice } from "@reduxjs/toolkit";

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
      console.log(action.payload)
      // console.log(state.value)

      const { listID, startIndex, endIndex } = action.payload;
      const [requiredList]= state.value.filter((list) => list.listID === listID);
      // console.log(requiredList)
      const requiredListIndex= state.value.findIndex((list) => list.listID === listID);

      const temp=requiredList.cards[startIndex]
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
