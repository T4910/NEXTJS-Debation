import UserDB from '../../database/userschema'
import DBconnect from '../../database/DBconnect'
import bcrypt from "bcryptjs"

export default async function handler(rq, rs){

  await DBconnect()
    if(!rq.method === 'POST') return {data: 'This is a POST handler'}

    const {name, email, password} = rq.body;
 console.log("Users request params", rq.body) 

  let hashedpass = await bcrypt.hash(password, 10)

  console.log(hashedpass)
    const user = await UserDB.create({
      name: name,
       email: email,
        password: hashedpass
     })

  console.log("\nUser adfed to the database", user)

    rs.status(201).json({f: "working", ...user})
}