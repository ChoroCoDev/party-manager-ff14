'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { auth, provider } from '../../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Image from 'next/image'

const listMenu =
  'border-2 border-b-0 p-1 hover:border-indigo-400 hover:text-blue-400 hover:underline hover:border-b-2 duration:300'

export const UserMenu = () => {
  const [user] = useAuthState(auth)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef: any = useRef()

  const listMenuCSS = useMemo(() => listMenu, [])
  const listMenuItems = useMemo(() => {
    return [
      {
        title: 'MyPage',
      },
      {
        title: 'PartyPage',
      },
      {
        child: <SignOutButton />,
      },
    ]
  }, [])

  const imageClickHandler = useCallback(() => setIsOpen(isOpen ? false : true), [])
  const blurHandler = useCallback(() => setTimeout(() => setIsOpen(false), 100), [])

  useEffect(() => {
    isOpen && menuRef.current.focus()
  }, [isOpen])

  return (
    <div>
      <Image
        src={auth.currentUser ? auth.currentUser.photoURL! : '/user_848006.png'}
        alt='ユーザーアイコン'
        width={30}
        height={30}
        className='rounded-full ml-auto mb-1'
        onClick={imageClickHandler}
      />
      {isOpen && (
        <ul onBlur={blurHandler} ref={menuRef} tabIndex={1} className='focus:outline-none'>
          {auth.currentUser ? (
            listMenuItems.map((item, index) => {
              const { title, child } = item
              return (
                <li
                  className={index != listMenuItems.length - 1 ? listMenuCSS : listMenuCSS + ' border-b-2'}
                  key={'list-item-' + index}>
                  {title ? title : child}
                </li>
              )
            })
          ) : (
            <li className={listMenuCSS + ' border-b-2'}>
              <SignInButton />
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

const SignInButton = () => {
  const signInWithGoogle = useCallback(() => {
    // firebaseを使ってGoogleでログインする
    signInWithPopup(auth, provider)
  }, [])

  return <div onClick={signInWithGoogle}>サインイン</div>
}

const SignOutButton = () => {
  const signOut = useCallback(() => {
    auth.signOut()
  }, [])

  return <div onClick={signOut}>サインアウト</div>
}

export default UserMenu
