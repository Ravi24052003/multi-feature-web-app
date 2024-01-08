import React, { useEffect } from 'react'
import OpenAI from 'openai'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import conf from '../conf/conf';

const AIBuddy = () => {
const {register, handleSubmit, formState, reset } = useForm();
const {isSubmitSuccessful} = formState;

const [answer, setAnswer] = useState("");
const [isDisabled, setIsDisabled] = useState(false);

      const onSubmit = (data)=>{
      const {aiBuddyField} = data;
      setIsDisabled(true)

      const openai = new OpenAI({
        apiKey: conf.openaiApiKey,
        dangerouslyAllowBrowser: true
      });

      async function main(question) {
        try {
          const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: question }],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0].message.content);
          const ans = completion.choices[0].message.content;
  
          setAnswer(ans)
          setIsDisabled(false)
        } catch (error) {
          setIsDisabled(false)
          console.log( error.message)
          setAnswer(error.message)
        }
       
      }

      main(aiBuddyField)
      }


      useEffect(()=>{
        if(isSubmitSuccessful){
          reset();
        }
      }, [isSubmitSuccessful, reset])

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className=' flex justify-center items-center'>
     <input placeholder='How can i help you' type="text" {...register("aiBuddyField")} className=' my-5 border-2 rounded border-gray-400 w-[220px] bg-indigo-100 md:w-[320px]'  />
     <button disabled={isDisabled} type='submit' className= {` rounded text-white font-bold px-2 py-[2px] md:px-5 md:py-1 ${(isDisabled)? 'bg-red-500' : 'bg-green-500'} `} >{isDisabled? <span>wait</span> : <span>send</span> }</button>
    </form>

    <p className=' text-center font-bold mx-2'>{answer}</p>
    </>
  )
}

export default AIBuddy
