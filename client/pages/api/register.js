import User from '../../userschema'
import mongoose from 'mongoose'

export default async function handler(rq, rs) {
    if(!rq.method === 'POST') return {data: 'This is a POST handler'}

    // mongoose.connect('mongodb://127.0.0.1/usersdb', () => {console.log('db connected')}, err => console.log(err))

    console.log(rq.body)
    const {name, email, password} = rq.body;

    // const user = await User.create({
    //     name,
    //     email,
    //     password
    // })

    rs.status(201).json({name: 'kk'})
}