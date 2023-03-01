import React from 'react'

export default function Notifications({active}) {
  return (
    <div style={{display: (active) ? 'block' : 'none'}}>
        <div className="notification">
            <p>Lorem ipsum dolor sit amet, consectet quis? Obcaecati officiis accusantium amet perferendis nisi.</p>
            <button>x</button>
        </div>
    </div>
  )
}
