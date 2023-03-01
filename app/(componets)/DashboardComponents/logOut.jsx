'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function logOut() {
    return (
        <button onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>LogOut</button>
  )
}
