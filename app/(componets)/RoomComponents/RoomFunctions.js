
export async function useAttachSteamtoVideo(refernce, stream){
    console.log(refernce)
    refernce.muted = true
    refernce.srcObject = stream
    refernce.play()


    const muteVideo = (bool) => stream.getVideoTracks()[0].enabled = !bool;
    const muteAudio = (bool) => stream.getAudioTracks()[0].enabled = !bool;
  
    return {
        streamID: stream?.id,
        isWorking: stream.active,
        muteAudio, 
        muteVideo
    }
}
