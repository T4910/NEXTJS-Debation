'use client'
import {useState, useEffect} from 'react'
import HeaderFuncitons from '../../(componets)/RoomComponents/HeaderFunctions'
import VideoStreams from '../../(componets)/RoomComponents/VideoStreaming'
import ChatBox from '../../(componets)/RoomComponents/ParticipantChatBox'
import ParticipantPresent from '../../(componets)/RoomComponents/ParticipantPresent'
import RoomDescription from '../../(componets)/RoomComponents/RoomDescription'
import BottomFunctions from '../../(componets)/RoomComponents/BottomFunctions'
import Notifications from '../../(componets)/RoomComponents/RoomNotifications'



export default function page({params}) {
  let [NotificationVisibiiltiy, setNotificationVisibiiltiy] = useState(false);
  let [streams, setStreams] = useState([])


  // Get creators videostream
  useEffect(() => {
     navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then((stream) => {
      setStreams([...streams, stream])
      
    })
  }, []);


  return (
    <>
        ROOMID: {params.id}
        <HeaderFuncitons 
        Notificationtoggle={NotificationVisibiiltiy} 
        NotificationtoggleFunc={setNotificationVisibiiltiy}/>

        <Notifications active = {NotificationVisibiiltiy}/>
        <VideoStreams streams={streams}/>
        <ChatBox />
        <ParticipantPresent />
        <RoomDescription />
        <BottomFunctions />
    </>
  )
}
