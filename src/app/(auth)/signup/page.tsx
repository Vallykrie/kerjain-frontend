import React from 'react'
import SignUpForm from '@/components/auth/sign-up-form'

const Signup = () => {
  return (
    <div 
      className='flex justify-center items-center h-[calc(100vh-160px)] bg-no-repeat bg-cover bg-signup'
    >
      <SignUpForm />
    </div>
  )
}

export default Signup