'use client'
import InviteSection from './InviteSection';
import {useState} from 'react';
import {useRouter} from 'next/navigation'
import {v4} from 'uuid'


export default function InitiateButtonContainer() {
  const [InviteVisibility, setInviteVisibility] = useState(false)
  const router = useRouter()
  const roomID = v4()

  function InitiateRoom(){
    router.push(`/rooms/${roomID}`)
  }

  return (
    <div>
        <InviteSection active={(InviteVisibility) ? 'block' : 'none'} />
        <button onClick={() => setInviteVisibility(!InviteVisibility)}>Invite</button>
        <button onClick={InitiateRoom}>Start room</button>
    </div>
  )
}
