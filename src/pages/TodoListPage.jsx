import { useEffect, useState } from "react";
import TodoForm from "../features/todoForm/TodoForm";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "../features/todoList/TodoList";
import { localStorageTodos } from "../features/todoForm/todoFormSlice";
import SearchField from "../features/todoForm/SearchField";

function App() {
  const todosArr = useSelector(state=> state.todoForm.todosArr);
  const dispatch = useDispatch()

    useEffect(()=>{
      const localstorageTodosArr = JSON.parse(localStorage.getItem("todosArr")) ?? []
      if(localstorageTodosArr && localstorageTodosArr.length > 0 ){
        dispatch(localStorageTodos(localstorageTodosArr))
      }
      }, [])  

  return (
    <>
    <div className=" md:flex md:justify-between md:items-start md:w-full">
      <div>
    <TodoForm />
    <TodoList />
    </div>
    <SearchField />
    </div>
    </>
  )
}

export default App
