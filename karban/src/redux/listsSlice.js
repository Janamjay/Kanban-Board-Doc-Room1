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
  },
});

export const { addList, deleteList, updateTitle } = listsSlice.actions;
export default listsSlice.reducer;