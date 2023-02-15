'use client'

import React from 'react'
import RoomConfigurations from '../RoomConfigurationComponents/RoomConfigs'
import JoinRoom from './Joinroom'

export default function MakeOrJoinRoom() {
    let [RoomConfigsVisibility, setRoomConfigsVisibility] = React.useState(false)
  return (
    <div>
        <button onClick={() => setRoomConfigsVisibility(!RoomConfigsVisibility)}>Make room</button>
        <RoomConfigurations active={(RoomConfigsVisibility) ? 'block' : 'none'}/>
        <JoinRoom />
    </div>
  )
}
