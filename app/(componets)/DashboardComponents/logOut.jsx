'use client'
import { signOut } from 'next-auth/react'

export default function logOut() {
    return (
        <button onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`})}>LogOut</button>
  )
}
