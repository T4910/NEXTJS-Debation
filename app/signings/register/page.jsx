'use client'
import {useState} from 'react'
import {signIn} from 'next-auth/react'

// To directly log in new user, just use the signIn() function that 
// next-auth provides to authenticate the user and it will automatically
//  redirect the new user to the dashboard or the page or new users

export default function register() {
    const [text, setText] = useState('Assa')
    const [email, setEmail] = useState('sasdf@gmail.com')
    const [password, setPassword] = useState('a')

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