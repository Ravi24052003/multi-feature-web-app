import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todosArr: [],
  searchArr: []
}

export const todoFormSlice = createSlice({
  name: 'todoForm',
  initialState,
  reducers: {
   addTodo: (state, action)=>{
   
    state.todosArr.push({todoVal: action.payload, idNano: nanoid()})
    
    localStorage.setItem("todosArr", JSON.stringify(state.todosArr))
   },
   removeTodo: (state, action)=>{
   
    state.todosArr = state.todosArr.filter((todo)=>todo.idNano !== action.payload.idNano);
   
    localStorage.setItem("todosArr", JSON.stringify(state.todosArr))
   },
   updateTodo: (state, action)=>{
    
  state.todosArr = state.todosArr.map((todo)=>{
      
      if(todo.idNano === action.payload.fieldName){
        return {...todo, todoVal: action.payload[String(todo.idNano)]}
      }
      else{
        return todo
      }
     })

  
   localStorage.setItem("todosArr", JSON.stringify(state.todosArr))
   },
   sortTodosaz: (state)=>{
     state.todosArr.sort((a, b)=>a.todoVal.localeCompare(b.todoVal))
   },
   sortTodosza: (state)=>{
    state.todosArr.sort((a, b)=>b.todoVal.localeCompare(a.todoVal))
  },
  searchTodo: (state, action)=>{
    if(action.payload === ""){
      state.searchArr = []
    }
    else{
   state.searchArr = state.todosArr.filter((todo)=>todo.todoVal.toLowerCase().startsWith(action.payload.toLowerCase()))
  }
},
localStorageTodos: (state, action)=>{
  state.todosArr = action.payload
}
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, updateTodo, sortTodosaz, sortTodosza, searchTodo, localStorageTodos } = todoFormSlice.actions

export default todoFormSlice.reducer