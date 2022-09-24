import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({children, type, ...rest}: ButtonProps ) {
  return (
    <button 
      {...rest}
      className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 rounded-md px-5 h-12 font-semibold"
    >
      {children}
    </button>
  )
}
