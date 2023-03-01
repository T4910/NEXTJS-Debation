'use client'
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";



export default function login() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')


  async function loginUser(e){
    e.preventDefault();
    
    const data = await signIn('credentials', {
      redirect: true,
      username: text,
      password: password,
      callbackUrl: 'http://localhost:3000/dashboard'
    })

    console.log(data)
  }

  return (
    <>
        <form onSubmit={loginUser}>
            <input 
              type='text' 
              placeholder="Username"
              value={text}
              onChange={(e) => setText(e.target.value)}
              />
            <input 
              type='password' 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="true"
            />
            <input type='submit' value='log In'/>
        </form>
    </>
  )
}
