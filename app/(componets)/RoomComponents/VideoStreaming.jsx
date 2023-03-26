'use client'
import {useAttachSteamtoVideo} from '../../(componets)/RoomComponents/RoomFunctions'
import { useEffect, useRef, useState } from 'react';



export default function VideoStreaming({streams}) {
  let [streamsState, setStreamsState] = useState(streams)
  let [videoElements, setVideoElements] = useState([])
  let videoContainerRef = useRef(null)

  useEffect(() => setStreamsState(streams), [streams])

  // makes video elements
  const streamingVideoElement = (key) => <video key={key} id={key} width={200}/>


  useEffect(() => {
    // renders all needed streaming video elements into app
    setVideoElements(() => {
      let newSetofVideos = [];
      streamsState.map((stream, index) => newSetofVideos = [...newSetofVideos, streamingVideoElement(index)])
      return newSetofVideos
    })


    // attaches all given streams to video elements
    streamsState.map((stream, index) => {
      const video = videoContainerRef.current.children[index];
      video && useAttachSteamtoVideo(video, stream);
    })

  }, [streamsState])




  return (
    <div style={{backgroundColor: 'red'}}>
        To be containing video of streamers....
        <div className='videocontainer' ref={videoContainerRef}>
          {videoElements.map((video) => video)}
        </div>
        <button onClick={() => muteVideo(true)}/>
    </div>
  )
}
