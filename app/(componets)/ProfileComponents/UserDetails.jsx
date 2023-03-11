'use client'
import {useState, useRef, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'


async function getUserDetails(ID, setdata){
  let res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/UserDetails`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({ID: ID}) 
  })
  let userdata = await res.json()
  console.log(userdata)
  setdata(userdata)
  return 
} 

export default function UserDetails({ID}) {
  let UserId = ID?.user.email.ID;
  let [{username, email, wins, image}, setUsedata] = useState({});
  useEffect(() => {if(ID) getUserDetails(UserId, setUsedata)}, [ID]);


  return (
    <div className="UserDetails" style={{backgroundColor: 'blue'}}>
    <Image 
      src="/ds.jsp" 
      alt="Profile picture" 
      width={100}
      height={100}
    />
    <div>
      <h3>
          <i>{username ? username : 'loading...'}</i>
      </h3>
      <p>{email ? email : 'loading...'}</p>
      <p id="win-count">
        Win count: <span>{(wins || wins === 0) ? wins : 'loading...'}</span>
      </p>
    </div>
  </div>
  )
}
