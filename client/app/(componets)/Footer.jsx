'use client'
import { useSession } from "next-auth/react"

export default  function Footer() {
  const data = useSession()
  console.log(data) 
  
  return (
    <>
    <div style={{color: 'white', backgroundColor: '#999999'}}>Footer</div>
    </>
  )
}
