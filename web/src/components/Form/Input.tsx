import { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister, ValidationRule } from 'react-hook-form';
import { IFormValues } from '../CreateAdModal';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  min?: number;
  max?: number;
  minLength?: number; 
  maxLength?: number; 
}

function Input({register, label, required, min, max, minLength, maxLength, ...rest}: InputProps) {

  return (
    <>
      <input 
        {...register(label,{ required, min, max, minLength, maxLength })}  
        {...rest}
        className="bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500"
      /> 
    </>
  )
}

export default Input;