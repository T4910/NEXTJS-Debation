import UserDB from '../../database/userschema'
import DBconnect from '../../database/DBconnect'
import bcrypt from 'bcryptjs'


DBconnect()

async function availablity(username){
    let userExist = await UserDB.find({username});
    return (userExist.length === 0) ? true : false;
}

export default async function handler(rq, rs) {
    if(!rq.method === 'POST') return rs.status(401).json({data: 'This is a POST handler'})
    
    const {name, email, password} = rq.body;
    let available = await availablity(name)

    // Confirming if username_avaliability route
    if(rq.body?.username_available_route) return rs.status(201).json({available: available})
    
    

    if(available === false) return rs.status(201).json({message: 'Sorry... Username taken'})
    
    const {_id: ID} = await UserDB.create({
        username: name,
        email,
        password: await bcrypt.hash(password, 10) // hashed password
    })

    console.log('New user made', ID)
    return rs.status(201).json({message: 'User made', user: ID})
}