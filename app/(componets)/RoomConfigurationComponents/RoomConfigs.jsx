'use client'
import SettingsContainer from './SettingsContainer'
import InitiateButtonContainer from './InitiateButtonContainer'

export default function RoomConfigs({active, toggleFunc}) {
  return (
    <div style={{display: (active) ? 'block' : 'none'}}>
      <div>
        <button onClick={() => toggleFunc(false)}>Cancel</button>
        <h2>Configure room</h2>
      </div>
      <SettingsContainer />
      <InitiateButtonContainer />
    </div>
  )
}
