'use client'

import Componet from './UserDetailsClientComponent'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'

async function getDetails(ID){
  // let res = await fetch('http://localhost:3000/api/UserDetails', {
  //   method: 'POST', 
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8'
  //   },
  //   body: JSON.stringify({ID: ID}) 
  // })

  // let data = await res.json()
  return {name: 'ss'}
}





export default function UserDetailsClientComponent() {
  let {data} = useSession()
  let UserId = data?.user.email.id
  let res;

  useEffect( async () => {
    res = getDetails(UserId)
  }, [])

  console.log(res)
  return(
      <>
        <Componet/>
      </>
    )
}



export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}