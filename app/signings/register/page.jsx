'use client'
import {useState} from 'react'




export default function register() {
    const [text, setText] = useState('a')
    const [email, setEmail] = useState('s@gmail.com')
    const [password, setPassword] = useState('ddddd')


    async function registerNewUser(e){
      e.preventDefault();
      
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
    
      console.log(data)
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