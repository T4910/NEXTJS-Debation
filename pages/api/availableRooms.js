import RoomDB from '../../database/roomschema'
import DBconnect from '../../database/DBconnect'

DBconnect()

export default async function handler(rq, rs) {
    const rooms = await RoomDB.find({visibility: true})
    console.log('rooms in availableRooms', rooms)

    rs.status(201).json({rooms: rooms})
}