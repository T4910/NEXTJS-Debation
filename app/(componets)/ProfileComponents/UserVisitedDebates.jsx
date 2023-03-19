'use client'
import Debates from "./Debates"
import {useState, useEffect} from "react"



export default function UserVisitedDebates({ID, debates}) {
  let [showndebates, setShowndebates] = useState([])
  let [moreDebatesBTN, setMoreDebatesBTN] = useState(true)
  useEffect(() => debates && setShowndebates(debates), [debates])

  async function getMoreDebates(){
    console.log('here are more debates...')
    let res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/UserDetails`, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({ID: ID, visitedDebates: {req_no: 15, current_no: showndebates.length}}) 
    })
    let newdebates = await res.json()
    newdebates.debatesFinished && setMoreDebatesBTN(false)
    setShowndebates([...showndebates, ...newdebates.reqDebates])
    console.log('Currently debates being shown:',showndebates.map(({timestart}) => timestart))
    return 
  }

  // console.log('Currently debates being shown:',showndebates.map(({timestart}) => timestart))

  return (
    <div>
      {
        showndebates.length 
        ? showndebates.map(({topic, role, description, room_id, timestart, timeend, visibility, winners}, index) => 
            (visibility) && 
              <Debates 
                  key={index}
                  topic={topic}
                  role={role}
                  description={description}
                  timestart={timestart}
                  timeend={timeend}
                  roomID={room_id}
                  winners={winners}
              />
          )
        : 'loading...'     
      }     
      {(moreDebatesBTN && showndebates.length !== 0) && <button onClick={getMoreDebates}>More</button>}
    </div>
  )
}
