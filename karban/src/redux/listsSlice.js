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
      // console.log(state.value[0])
    },
    deleteList: (state, action) => {
      state.value = state.value.filter(
        (item) => item.listID !== action.payload
      );
    },
    addTaskToList: (state, action)=>{
      const reqdList=state.value.find(list=>list.listID==action.payload.listID)
      const reqdIndex=state.value.findIndex(list=>list.listID==action.payload.listID)

      reqdList.cards.push(action.payload)
      state.value.splice(reqdIndex, 1, reqdList) 
      
      }

    ,
    updateTitle: (state, action) => {
      // console.log(state.value[0])
      const { listID, listTitle } = action.payload;
      const index = state.value.findIndex((item) => item.listID === listID);
      // console.log(index)

      if (index !== -1) {
        state.value[index].listTitle = listTitle;
      }
    },
    reorderCards: (state, action) => {
      console.log(current(state).value)
      console.log(action.payload)

      const tempState=[...state.value]
      const { targetListID, startIndex, endIndex } = action.payload;
      // console.log(startIndex, endIndex)
      const requiredList= tempState.find((list)=>list.listID==targetListID)
      const requiredListIndex=tempState.findIndex((list)=>list.listID==targetListID)

      // console.log(temp, "temp")
      const [reorderedCard]=requiredList.cards.splice(startIndex,1)
      requiredList.cards.splice(endIndex, 0, reorderedCard)
      tempState.splice(requiredListIndex, 1, requiredList)
      // console.log(tempState)
      state.value=tempState
      console.log(current(state).value)
      
      //Not working
      // requiredList.cards[startIndex]=requiredList.cards[endIndex]
      // temp.splice(endIndex, 1, )
      // requiredList.cards[endIndex]=temp
      // const [removedCard] = cards.splice(startIndex, 1);
      // cards.splice(endIndex, 0, removedCard);

    }
  }
});

export const { addList, deleteList, addTaskToList, updateTitle, reorderCards } = listsSlice.actions;
export default listsSlice.reducer;
