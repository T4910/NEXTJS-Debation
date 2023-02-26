export default function RoomListElement({RoomID, creator, topic, description, judgingSys, teams}) {
  return (
    <div>
        <p>{RoomID}</p>
        <p>{creator}</p>
        <p>{topic}</p>
        <p>{description}</p>
        <p>{judgingSys}</p>
        <p>{teams}</p>
    </div>
  )
}
