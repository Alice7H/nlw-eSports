import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  return (
    <input 
      {...props}
      className="bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500"
  /> 
  )
}

export default Input;