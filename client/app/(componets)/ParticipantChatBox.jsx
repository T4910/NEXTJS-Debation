import React from 'react'

export default function ParticipantChatBox() {
  return (
    <div>
        <div>CHAT SPACE</div>
        <div>
            <select id="seleteduser">
                <option value="" disabled>...</option>
            </select>
            <input type="text" name="message" id="message" />
            <input type="submit" value="send" />
        </div>
    </div>
  )
}
