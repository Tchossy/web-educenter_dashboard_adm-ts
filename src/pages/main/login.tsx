import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { InputFloatingLabel } from '../../components/input/InputFloatingLabel'
import { User, Mail, Lock, Phone } from 'lucide-react'
import { BaseButton } from '../../components/buttons/baseButton'

const loginEmployeeSchema = z.object({
  email: z
    .string({
      required_error: 'O email é obrigatório!'
    })
    .email('Formato de email invalido')
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: 'A palavra-passe é obrigatório!'
    })
    .min(6, 'A palavra-passe tem de no mínimo 6 caracteres')
    .trim()
    .refine(value => value, {
      message: 'Por favor, preencha este campo.'
    })
})

type loginEmployeeType = z.infer<typeof loginEmployeeSchema>

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<loginEmployeeType>({
    resolver: zodResolver(loginEmployeeSchema)
  })

  async function handleLogin(dataForm: loginEmployeeType) {
    alert('Login')
    console.log(dataForm)
  }

  return (
    <>
      <div className="relative w-screen h-screen flex flex-row justify-center items-center gap-0 bg-slate-100/50 ">
        <div className="relative p-8 w-auto h-auto bg-white rounded-2xl flex flex-col justify-center items-start gap-5 max-w-3xl shadow-lg ">
          {/* Logo */}
          <div className="max-w-[18rem] ">
            <img
              src="/logo/logo.png"
              alt="Logo CCI"
              className="w-full max-w-s-xs min-w-[8rem] "
            />
          </div>

          <h1 className="text-3xl font-bold max-w-s-520:text-3xl max-w-s-900:text-4xl">
            Bem vindo de volta!
          </h1>

          <p className="relative py-2 text-[0.85rem] text-start font-normal max-w-md max-w-s-420:text-base">
            Insira seu endereço de e-mail válido e senha para acessar a sua
            conta
          </p>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="relative w-full flex flex-col justify-center items-start gap-5 "
          >
            <InputFloatingLabel
              type="email"
              label="Email"
              name="email"
              control={control}
              error={errors.email}
              icon={Mail}
              id="emailId"
            />

            <InputFloatingLabel
              type="password"
              label="Senha"
              name="password"
              control={control}
              id="passId"
              icon={Lock}
              error={errors.password}
            />

            <BaseButton
              typeButton="submit"
              title="Efetuar login"
              styleBtn="CircleHover"
            />
          </form>
        </div>
      </div>
    </>
  )
}
