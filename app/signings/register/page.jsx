'use client'
import { useState, useEffect } from 'react'
import {signIn} from 'next-auth/react'
import UsernameFree from '../../(componets)/UsernameAvailability'

async function checkUsernameAvailability(username, available_variable_setstate_function) {
  let rs = await fetch('/api/register',{
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        name: username, 
        username_available_route: true
      }) 
    })
  const {available} = await rs.json()
  available_variable_setstate_function(available)
  return 
}

export default function register() {
    const [text, setText] = useState('Assa')
    const [email, setEmail] = useState('sasdf@gmail.com')
    const [password, setPassword] = useState('a')
    const [USERNAMEavailable, setUSERNAMEavailable] = useState()
    
    useEffect(() => {checkUsernameAvailability(text, setUSERNAMEavailable)}, [text])

    async function registerNewUser(e){
      e.preventDefault();
      
      // Register API
      const data = await fetch('/api/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          name: text, 
          email: email, 
          password: password
        }) 
      })
      
      let res = await data.json()
    
      // Ensuring user got registersed
      if(res.message !== 'User made') return console.log('ERROR REGISTERING...')
    
      // Signing User 
      await signIn('credentials', {
        redirect: true,
        username: text,
        password: password,
        callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`
      })
    
      console.log(data)
      return data
    }

    return (
      <>
          <UsernameFree 
            username={text}
            availability={USERNAMEavailable}
          />
          <form onSubmit={registerNewUser}>
              <input 
                type='text' 
                placeholder="Username"
                value={text}  
                onChange={(e) => setText(e.target.value)}
              />
              <input 
                type='email'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              <input 
                type='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              <input type="submit" value="Sign up"/>
          </form>
      </>
    )
  }