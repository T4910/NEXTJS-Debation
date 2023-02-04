import React from 'react'
import ListofOpenRooms from '../(componets)/List_of_open_rooms'
import MakeOrJoinRooms from '../(componets)/MakeOrJoinRoom'

export default function Main_dashboard() {
  return (
    <div>
        <ListofOpenRooms />
        <MakeOrJoinRooms />
    </div>
  )
}
