import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { searchTodo } from './todoFormSlice';

const SearchField = () => {
    const { register, watch } = useForm()
    const searchArr = useSelector(state=> state.todoForm.searchArr)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(searchTodo(watch("searchField")))
      }, [watch("searchField")])
    
  return (
    <div className=' flex flex-col justify-center items-center mt-2 md:w-[40%]'>
      <h1 className=' font-bold text-center'>Search input field</h1>
      <input type="text" {...register("searchField")} className='w-[80%] border border-orange-300 my-2 bg-gray-200 focus:bg-indigo-200 rounded font-bold md:w-[280px]' />
          {searchArr.map((todo, index)=><h1 className=' font-bold' key={todo.idNano}>{index+1}{' '}{todo?.todoVal}</h1>)}
          
          {searchArr.length > 1 && <h1 className=' font-bold'>{searchArr.length} todos found with input {watch("searchField")}</h1>}
          {searchArr.length === 1 && <h1 className=' font-bold'>{searchArr.length} todo found with input {watch("searchField")}</h1>}
    </div>
  )
}

export default SearchField
