import React from 'react'
import RoomConfigurations from '../(componets)/RoomConfigs'
import JoinRoom from '../(componets)/Joinroom'

export default function MakeOrJoinRoom() {
    let roomConfigs = false
  return (
    <div>
        <button>Make room</button>
        <RoomConfigurations active={roomConfigs}/>
        <JoinRoom />
    </div>
  )
}
