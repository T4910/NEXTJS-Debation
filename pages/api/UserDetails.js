import UserDB from '../../database/userschema'
import DBconnect from '../../database/DBconnect'

DBconnect()

export default async function handler(rq, rs) {
    if(!rq.method === 'POST') return {data: 'This is a POST handler'}
    
    const {ID} = rq.body

    if(!ID) return rs.status(401).json({})
    if (rq.body.visitedDebates){
        let {req_no, current_no} = rq.body.visitedDebates
        let [{debates}] = await UserDB.find({_id: ID})
        let reqDebates = debates.slice(-(req_no + current_no), -(current_no)).reverse()
        // console.log(`${debates.length - (req_no + current_no)} debates left to see.`)
        return rs.status(200).json({
            reqDebates: reqDebates,
            debatesFinished: (req_no + current_no >= debates.length) ? true : false
        })
    }

    const {username, email, wins, imgPath, description, debates, socials} = await UserDB.findOne({_id: ID})

    
    rs.status(201).json({
        username: username,
        email: email,
        wins: wins,
        image: imgPath,
        description: description,
        socials: socials,
        debates: debates.slice(-15).reverse()
    })
}