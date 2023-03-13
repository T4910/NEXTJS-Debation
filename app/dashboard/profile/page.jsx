'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import UserPicAndDesc from '../../(componets)/ProfileComponents/UserPicAndDesc'
import SocialLinks from '../../(componets)/ProfileComponents/UserSocialLinks'
import UserVisitedDebates from '../../(componets)/ProfileComponents/UserVisitedDebates.jsx'


async function getUserDetails(ID, setdata){
  let res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/UserDetails`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({ID: ID}) 
  })
  let userdata = await res.json()
  setdata(userdata)
  return 
} 


export default function profile() {
  let {data: session} = useSession()

  let UserID = session?.user.email.ID
  let [UserInfo, setUserInfo] = useState({})
  useEffect(() => {if(session) getUserDetails(UserID, setUserInfo)}, [session]);


  let {debates, ...others} = UserInfo
  return (
    <div>
       <UserPicAndDesc {...others}/>
       <SocialLinks />
       <UserVisitedDebates debates={debates}/>
    </div>
  )
}
