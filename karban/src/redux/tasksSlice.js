import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:[]
}

export const tasksSlice=createSlice({
    name:"tasks",
    initialState,
    reducers:{
        addTask: (state, action)=>{
            // console.log(action.payload)
            state.value.push(action.payload)
        }, 
        deleteTask: (state, action)=>{
            state.value=state.value.filter(task=>task.cardID!==action.payload)
        }
    }


})

export const {addTask, deleteTask}=tasksSlice.actions
export default tasksSlice.reducer