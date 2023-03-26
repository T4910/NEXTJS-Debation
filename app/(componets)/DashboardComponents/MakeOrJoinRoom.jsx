'use client'

import {useState} from 'react'
import RoomConfigurations from '../RoomConfigurationComponents/RoomConfigs'
import JoinRoom from './Joinroom'

export default function MakeOrJoinRoom() {
    let [RoomConfigsVisibility, setRoomConfigsVisibility] = useState(false)
  return (
    <div>
        <button onClick={() => setRoomConfigsVisibility(!RoomConfigsVisibility)}>Make room</button>
        <RoomConfigurations 
          active={RoomConfigsVisibility}
          toggleFunc={setRoomConfigsVisibility}
        />
        <JoinRoom />
    </div>
  )
}
