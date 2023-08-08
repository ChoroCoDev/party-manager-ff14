import React from 'react'
import UserMenu from '@/components/Login/UserMenu'

export const Login = () => {
  return (
    <div className='container p-2 flex justify-between'>
      <h1 className='text-3xl font-bold'>firebaseでログイン機能</h1>
      <UserMenu />
    </div>
  )
}
