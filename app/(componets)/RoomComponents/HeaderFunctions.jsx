'use client'
import { useRouter } from "next/navigation"


export default function HeaderFunctions({Notificationtoggle, NotificationtoggleFunc}) {
  const router = useRouter()

  function safelyLeave(){
    router.push('/dashboard')
  }

  return (
    <div style={{backgroundColor: 'brown'}}>
        <h2>Debation</h2>
        <button onClick={() => NotificationtoggleFunc(!Notificationtoggle)}>Notifcation Icon</button>
        <button onClick={safelyLeave}>Leave</button>
        <button style={{display: 'none'}}>Leave for all</button>
    </div>
  )
}
