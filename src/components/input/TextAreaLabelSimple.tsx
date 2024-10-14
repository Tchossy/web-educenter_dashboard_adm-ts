import { ChangeEvent } from 'react'
import { Controller } from 'react-hook-form'

interface TextAreaLabelSimpleProps {
  error?: boolean // Erros do react-hook-form
  error_message?: string
  isDisabled?: boolean // Erros do react-hook-form
  value?: string
  htmlFor: string
  label: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export function TextAreaLabelSimple({
  isDisabled = false,
  error = false,
  error_message,
  value,
  htmlFor,
  label,
  placeholder,
  onChange,
  required
}: TextAreaLabelSimpleProps) {
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)
  }

  return (
    <>
      <div className="w-full">
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium dark:text-light text-gray-600"
        >
          {label}
        </label>

        <textarea
          id={htmlFor}
          value={value}
          disabled={isDisabled}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className={`w-full p-2.5 dark:bg-gray-700/60 bg-gray-100/10  dark:border-gray-500/60 border-gray-300/60 dark:placeholder-gray-400 dark:text-gray-300 placeholder-gray-500 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block`}
        />

        {error && (
          <span className="errorMessage py-1 text-red-600 text-xs font-medium ">
            {error_message}
          </span>
        )}
      </div>
    </>
  )
}