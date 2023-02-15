'use client'

import Link from 'next/link'

export default function HeaderFunctions({Notificationtoggle, NotificationtoggleFunc}) {


  return (
    <div style={{backgroundColor: 'brown'}}>
        <h2>Debation</h2>
        <button onClick={() => NotificationtoggleFunc(!Notificationtoggle)}>Notifcation Icon</button>
        <button><Link href="/dashboard">Leave</Link></button>
        <button style={{display: 'none'}}>Leave for all</button>
    </div>
  )
}
