import React from 'react'
import ListofOpenRooms from '../(componets)/List_of_open_rooms'
import MakeOrJoinRooms from '../(componets)/MakeOrJoinRoom'
import DashboardNavBar from '../(componets)/DashboardNavBar'

export default function Main_dashboard() {
  return (
    <div>
        <DashboardNavBar />
        <ListofOpenRooms />
        <MakeOrJoinRooms />
        <p>ddddd</p>
    </div>
  )
}
