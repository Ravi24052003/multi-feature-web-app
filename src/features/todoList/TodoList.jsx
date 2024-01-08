import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, updateTodo } from '../todoForm/todoFormSlice';
import { useForm } from 'react-hook-form'

const TodoList = () => {
    const values = useSelector(state=> state.todoForm.todosArr);
    const [isEditable, setIsEditable] = useState(false);
    const [fieldName, setFieldName] = useState("")
    const [fieldValue, setFieldValue] = useState("")
    const [key, setKey] = useState("")

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

  return (
   <>
   <h1 className=' font-bold text-center mt-5'>Todo list</h1>
   {values?.map((val)=>
   <div key={val.idNano} className=' my-4 md:w-[100%] md:ml-[5%]'>
    {(isEditable && (key === val.idNano))? <form className=' flex flex-col items-center md:flex-row md:justify-between' onSubmit={handleSubmit((formData)=>{
      setIsEditable(false)
      dispatch(updateTodo({...formData, fieldName}))
      })} > <input type="text" defaultValue={val.todoVal} {...register(val.idNano)} className='border border-gray-500 my-2 bg-gray-200 focus:bg-indigo-200 rounded font-bold' /> <div> <button className=' text-white  bg-yellow-500 px-4 py-[2.5px] rounded font-bold'>Done</button> <button type='button' onClick={()=>{
        dispatch(removeTodo(val))
    }} className='  bg-red-500 text-white px-4 py-[2.5px] rounded font-bold'>remove</button> </div> </form>   : <div className=' flex flex-col items-center md:flex-row md:justify-between'>  <h1 className=' font-bold '>{val.todoVal}</h1>
      <div> <button onClick={(e)=>{
       setIsEditable(true)
       setFieldName(val.idNano)
       setFieldValue(val.todoVal)
       setKey(val.idNano)
      }} className='  bg-yellow-500 text-white px-4 py-[2.5px] rounded font-bold md:mr-4'>Edit</button> <button onClick={()=>{
        dispatch(removeTodo(val))
    }} className='  bg-red-500 text-white px-4 py-[2.5px] rounded font-bold'>remove</button> </div> </div> }

   </div>
   )}
   </>
  )
}

export default TodoList
