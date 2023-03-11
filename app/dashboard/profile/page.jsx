'use client'
import { useSession } from 'next-auth/react'
import UserPicAndDesc from '../../(componets)/ProfileComponents/UserPicAndDesc'
import SocialLinks from '../../(componets)/ProfileComponents/UserSocialLinks'
import UserVisitedDebates from '../../(componets)/ProfileComponents/UserVisitedDebates.jsx'


export default function profile() {
  let {data} = useSession()

  return (
    <div>
        <UserPicAndDesc ID={data}/>
        <SocialLinks />
        <UserVisitedDebates ID={data}/>
    </div>
  )
}
