'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Logo from '@/components/Logo'
import PageBackLink from '@/components/PageBackLink'
import ErrorMessages from '@/components/auth/ErrorMessages'

const signInFormSchema = z.object({
  email: z.string(),
  password: z.string().min(1),
})

export default function Login() {
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: 'onChange',
  })

  return (
    <div>
      <PageBackLink />
      <div className='min-w-[358px] sm:w-[448px]'>
        <Logo />
        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle className='text-center'>Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className='flex flex-col space-y-4'
                action='/api/auth/sign-in'
                method='post'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          className='h-14'
                          placeholder='you@example.com'
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
                <Button className='mt-4 h-14 bg-[#161616]'>
                  Sign In
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
                <Link href='/request-password-reset' className='text-center'>
                  Forgot your password?
                </Link>
                <ErrorMessages />
              </form>
            </Form>
          </CardContent>
          <CardFooter className='bg-[#f4f4f5] pt-4'>
            <p className='w-full text-center text-[#161616]'>
              Don&apos;t have an account?&nbsp;
              <Link href='/signup'>Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
