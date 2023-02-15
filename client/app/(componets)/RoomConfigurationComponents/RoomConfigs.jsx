// 'use client'
import SettingsContainer from './SettingsContainer'
import InitiateButtonContainer from './InitiateButtonContainer'

export default function RoomConfigs({active}) {
  return (
    <div style={{display: active}}>
      <div>
        <button>Cancel</button>
        <h2>Configure room</h2>
      </div>
      <SettingsContainer />
      <InitiateButtonContainer />
    </div>
  )
}
