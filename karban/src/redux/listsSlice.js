import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      // console.log(action.payload)
      // console.log(state.value[0])

      state.value.push({
        listID: action.payload.id,
        listTitle: action.payload.title,
        cards: action.payload.cards,
      });
      console.log(state.value[0]);
    },
    deleteList: (state, action) => {
      // console.log(action.payload)
      state.value = state.value.filter(
        (item) => item.listID !== action.payload
      );
    },
    updateTitle: (state, action) => {
      const { listID, listTitle } = action.payload;
      const index = state.value.findIndex(item => item.listID === listID);
      
      if (index !== -1) {
        state.value[index].listTitle = listTitle;
      }
    },
    
  },
});

export const { addList, deleteList, updateTitle } = listsSlice.actions;
export default listsSlice.reducer;
