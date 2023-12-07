'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Logo from '@/components/shared/Logo'
import PageBackLink from '@/components/shared/PageBackLink'
import ErrorMessages from '@/components/auth/ErrorMessages'

const updatePasswordSchema = z
  .object({
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export default function UpdatePassword() {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange',
  })

  return (
    <div>
      <PageBackLink />
      <div className='min-w-[358px] sm:w-[448px]'>
        <Logo />
        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle className='text-center'>Set new password</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className='flex flex-col space-y-4'
                action='/api/auth/update-password'
                method='post'
              >
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <Input
                          className='h-14'
                          type='password'
                          placeholder='••••••••'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field, fieldState }) => (
                    <>
                      <FormLabel htmlFor='confirmPassword'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='h-14'
                          type='password'
                          placeholder='••••••••'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {fieldState.error && fieldState.error.message}
                      </FormMessage>
                    </>
                  )}
                />
                <Button className='mt-4 h-14 bg-[#161616]'>
                  Set new password
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='ml-4 h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </Button>
                <ErrorMessages />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
