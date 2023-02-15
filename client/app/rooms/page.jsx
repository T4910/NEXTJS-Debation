import HeaderFuncitons from '../(componets)/RoomComponents/HeaderFunctions'
import VideoStreaming from '../(componets)/RoomComponents/VideoStreaming'
import ParticipantChatBox from '../(componets)/RoomComponents/ParticipantChatBox'
import ParticipantPresent from '../(componets)/RoomComponents/ParticipantPresent'
import BottomFunctions from '../(componets)/RoomComponents/BottomFunctions'
import Notifications from '../(componets)/RoomComponents/RoomNotifications'

export default function page() {
  return (
    <>
        <HeaderFuncitons />
        <Notifications />
        <VideoStreaming />
        <ParticipantChatBox />
        <ParticipantPresent />
        <BottomFunctions />
    </>
  )
}
