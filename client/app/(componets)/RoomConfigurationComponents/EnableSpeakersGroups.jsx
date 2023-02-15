'use client'
import React from 'react'


export default function EnableSpeakersGroups() {
    let [selectVisibility, setselectVisibiity] = React.useState(false)


  return (
    <div>
        <input type="checkbox" onChange={() => setselectVisibiity(!selectVisibility)} />
        <div style={{display: selectVisibility ? 'block' : 'none'}}>
            <label htmlFor="num-groups">Number of groups</label>
            <input type="number" name="num-groups" min="1" max="10" defaultValue="2" />
        </div>

    </div>
  )
}
