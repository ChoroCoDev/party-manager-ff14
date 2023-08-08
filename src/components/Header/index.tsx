'use client'
import UserMenu from '@/components/Login/UserMenu'
import React, { useMemo } from 'react'

const Header = () => {
  const items = useMemo(() => {
    return [<p>MyPage</p>, <p>PartyPage</p>, <UserMenu />]
  }, [])
  return (
    <div className='container flex justify-between'>
      <h1 className='text-4xl font-bold hover:text-red-700/80 duration-300'>PartyManageApp</h1>
      <ul className='flex flex-row '>
        {/* サインインしていない場合は表示しないようにしてもいいかも？ */}
        {items.map((item, index) => (
          <li className='mx-2 my-1 hover:text-blue-400 hover:underline' key={'header-item-' + index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Header
