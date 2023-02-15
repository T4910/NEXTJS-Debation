'use client'

import InviteSection from './InviteSection';
import React from 'react';
import Link from 'next/link'

export default function InitiateButtonContainer() {
    let [InviteVisibility, setInviteVisibility] = React.useState(false)
  return (
    <div>
        <InviteSection active={(InviteVisibility) ? 'block' : 'none'} />
        <button onClick={() => setInviteVisibility(!InviteVisibility)}>Invite</button>
        <Link href="rooms">Start room</Link>
    </div>
  )
}
