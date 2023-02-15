import React from 'react'

export default function UserDetails() {
  return (
    <div className="UserDetails" style={{backgroundColor: 'blue'}}>
        <img src="" alt="Profile picture" />
        <div>
            <h3>
                <i>...Usernamvme</i>
            </h3>
            <p>...Email</p>
            <p id="win-count">
                Win count: <span>1</span>
            </p>
        </div>
    </div>
  )
}
