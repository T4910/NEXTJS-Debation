import RoomDB from '../../database/roomschema'
import DBconnect from '../../database/DBconnect'

DBconnect()

export default async function handler(rq, rs) {
    const rooms = await RoomDB.find({visibility: true})
    rs.status(200).json({rooms: rooms})
}