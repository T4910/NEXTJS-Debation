import React from 'react'
import ListofOpenRooms from '../(componets)/DashboardComponents/List_of_open_rooms'
import MakeOrJoinRooms from '../(componets)/DashboardComponents/MakeOrJoinRoom'

export default function Main_dashboard() {
  return (
    <div>
        <ListofOpenRooms />
        <MakeOrJoinRooms />
    </div>
  )
}
