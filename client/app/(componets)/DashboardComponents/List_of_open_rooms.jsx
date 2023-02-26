import React from 'react'
import RoomListChild from './RoomListElement'

async function availableRooms(){
  const res = await fetch('http://127.0.0.1:3000/api/availableRooms', {next: {revalidate: 10}})
  let { rooms: roomsAvailable } = await res.json()

  return roomsAvailable
}


export default async function List_of_open_rooms() {
  const AvailableRooms = await availableRooms()
  return (
    <div>
      {(AvailableRooms.length !== 0) ?
      
      AvailableRooms.map((e, index) => 
          <RoomListChild 
          key={index}
          roomID={e.room_id}
          creator={e.creator}
          topic={e.topic}
          description={e.description}
          judgingSys={e.judgingSys}
          teams={e.teams}
          />
      ) : <p>No rooms currently available...</p>}
    </div>
  )
}
