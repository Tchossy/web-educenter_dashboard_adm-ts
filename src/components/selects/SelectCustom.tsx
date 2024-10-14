import React, { ChangeEvent } from 'react'

interface SelectProps {
  padding?: string
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (value: string) => void
}

export function SelectCustom({
  padding,
  options,
  selectedValue,
  onChange
}: SelectProps) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value
    onChange(selectedOption)
  }

  return (
    <select
      id="countries"
      className={`sm:w-auto p-${
        padding ? padding : '2.5'
      }  text-xs font-medium text-dark rounded-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      value={selectedValue}
      onChange={handleSelectChange}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
