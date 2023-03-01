'use client'
import React from 'react'
import HeaderFuncitons from '../(componets)/RoomComponents/HeaderFunctions'
import VideoStreaming from '../(componets)/RoomComponents/VideoStreaming'
import ChatBox from '../(componets)/RoomComponents/ParticipantChatBox'
import ParticipantPresent from '../(componets)/RoomComponents/ParticipantPresent'
import RoomDescription from '../(componets)/RoomComponents/RoomDescription'
import BottomFunctions from '../(componets)/RoomComponents/BottomFunctions'
import Notifications from '../(componets)/RoomComponents/RoomNotifications'

export default function page() {
  let [NotificationVisibiiltiy, setNotificationVisibiiltiy] = React.useState(false);

  return (
    <>
        <HeaderFuncitons 
        Notificationtoggle={NotificationVisibiiltiy} 
        NotificationtoggleFunc={setNotificationVisibiiltiy}/>

        <Notifications active = {NotificationVisibiiltiy}/>
        <VideoStreaming />
        <ChatBox />
        <ParticipantPresent />
        <RoomDescription />
        <BottomFunctions />
    </>
  )
}
