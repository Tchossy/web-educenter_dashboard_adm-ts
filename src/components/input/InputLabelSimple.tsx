import { ChangeEvent, useState, useEffect } from 'react'

interface InputLabelSimpleProps {
  error?: boolean // Erros do react-hook-form
  error_message?: string
  isDisabled?: boolean // Erros do react-hook-form
  type: string
  value?: string // Valor inicial opcional
  htmlFor: string
  label: string
  onChange: (value: string) => void // Função para controlar a mudança de valor
  placeholder?: string
  required?: boolean
}

export function InputLabelSimple({
  isDisabled = false,
  error = false,
  error_message,
  type,
  value = '', // Valor inicial opcional com valor padrão
  htmlFor,
  label,
  placeholder,
  onChange,
  required
}: InputLabelSimpleProps) {
  // Estado interno para controlar o valor do input
  const [inputValue, setInputValue] = useState<string>(value)

  // Atualiza o valor inicial quando ele for passado
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value)
    }
  }, [value])

  // Função para lidar com as mudanças no input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue) // Atualiza o estado interno
    onChange(newValue) // Chama o callback passado via props
  }

  return (
    <div className="w-full">
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium dark:text-light text-gray-600"
      >
        {label}
      </label>
      <input
        type={type}
        id={htmlFor}
        value={inputValue} // Controlado pelo estado interno
        disabled={isDisabled}
        onChange={handleInputChange} // Função de mudança de input
        className={`w-full p-2.5 border dark:bg-gray-700/60 bg-gray-100/10 dark:border-gray-500/60 border-gray-300/60 dark:text-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block`}
        placeholder={placeholder || ''}
        required={required}
      />
      {error && (
        <span className="errorMessage py-1 text-red-600 text-xs font-medium">
          {error_message}
        </span>
      )}
    </div>
  )
}
