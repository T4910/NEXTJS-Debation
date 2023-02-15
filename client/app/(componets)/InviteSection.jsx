export default function InviteSection({ active }) {
  return (
    <div style={{display: active}}>
        <input type="email" id="invite" placeholder="Enter your email address..." />
        <input type="submit" value="Send Invite" />
    </div>
  )
}
