import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, searchTodo, sortTodosaz, sortTodosza } from './todoFormSlice';

const TodoForm = () => {
    const { register, handleSubmit, watch } = useForm()
    const dispatch = useDispatch()

    const onSubmit = (formData)=>{
          const {todo} = formData
          dispatch(addTodo(todo))
    }

  return (
    <>
    <h1 className=' font-bold text-center mt-2 '>Add Todo</h1>
    <div className=' flex justify-center md:flex md:justify-start md:ml-[5%] md:w-full'>
    <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-center items-center md:flex-row '>
        <input type="text"
        className=' w-full border border-gray-500 my-2 bg-gray-200 focus:bg-indigo-200 rounded font-bold md:w-[280px]'
        {...register("todo")}
        />
         
         <div className=' md:flex'>
        <button className=' mx-3 bg-green-500 text-white px-4 py-[2.5px] rounded font-bold'>Add</button>
        
        <button type='button' onClick={()=>dispatch(sortTodosaz())} className=' bg-purple-500 text-white px-4 py-[2.5px] rounded font-bold'>A to Z</button>
        
        <button type='button' onClick={()=>dispatch(sortTodosza())} className=' mx-3 bg-indigo-500 text-white px-4 py-[2.5px] rounded font-bold'>Z to A</button>
        </div>
    </form>
    </div>
    </>
  )
}

export default TodoForm
