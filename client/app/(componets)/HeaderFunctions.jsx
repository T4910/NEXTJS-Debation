import React from 'react'

export default function HeaderFunctions() {
  return (
    <div style={{backgroundColor: 'brown'}}>
        <h2>Debation</h2>
        <button>Notifcation Icon</button>
        <button>Leave</button>
        <button style={{
            display: 'none'
        }}>Leave for all</button>
    </div>
  )
}
