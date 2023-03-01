import UserDB from '../../database/userschema'
import DBconnect from '../../database/DBconnect'

DBconnect()

export default async function handler(rq, rs) {
    if(!rq.method === 'POST') return {data: 'This is a POST handler'}
    
    const {ID} = rq.body
    const [{username, email, wins, imgPath}] = await UserDB.find({_id: ID})


    rs.json({
        username: username,
        email: email,
        wins: wins,
        image: imgPath
    })
}