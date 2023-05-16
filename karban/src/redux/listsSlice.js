import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:[]
}

export const listsSlice=createSlice({
    name:"lists", 
    initialState, 
    reducers:{
        addList: (state, action) =>{
            // console.log(action.payload)
            state.value.push({listID:action.payload.id, listTitle: action.payload.title, cards:action.payload.cards})
            // console.log(state.value[0])
        },
        deleteList: (state, action) =>{
            // console.log(action.payload)
            state.value=state.value.filter(item=>item.listID!==action.payload)
        },
        
    }
})

export const {addList, deleteList}=listsSlice.actions
export default listsSlice.reducer