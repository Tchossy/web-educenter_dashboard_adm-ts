import React from 'react'

interface InputWithButtonProps {
  placeholder: string
  buttonText?: string
  icon?: React.ReactElement
  onButtonClick: () => void
}

export function InputWithButton({
  placeholder,
  buttonText,
  icon,
  onButtonClick
}: InputWithButtonProps) {
  return (
    <div className="w-full flex items-center border-[1px] bg-gray-100 dark:bg-gray-500/20 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden ">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-10 text-sm bg-transparent border-none focus:outline-none"
      />
      <button
        onClick={onButtonClick}
        className="h-10 p-4 flex flex-row items-center justify-center gap-2 bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 border-none focus:outline-none transition-all duration-300"
      >
        {icon && icon}
        {buttonText && buttonText}
      </button>
    </div>
  )
}
