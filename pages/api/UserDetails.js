import UserDB from '../../database/userschema'
import DBconnect from '../../database/DBconnect'

DBconnect()

export default async function handler(rq, rs) {
    if(!rq.method === 'POST') return {data: 'This is a POST handler'}
    
    const {ID} = rq.body

    if(!ID) return rs.status(401).json({})
    const {username, email, wins, imgPath} = await UserDB.findOne({_id: ID})

    
    rs.status(201).json({
        username: username,
        email: email,
        wins: wins,
        image: imgPath
    })
}