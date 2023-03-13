import Image from 'next/image'

export default function UserDetails({username, email, wins}) {
  return (
    <div className="UserDetails" style={{backgroundColor: 'blue'}}>
    <Image 
      src="/ds.jsp" 
      alt="Profile picture" 
      width={100}
      height={100}
    />
    <div>
      <h3>
          <i>{username ? username : 'loading...'}</i>
      </h3>
      <p>{email ? email : 'loading...'}</p>
      <p id="win-count">
        Win count: <span>{(wins || wins === 0) ? wins : 'loading...'}</span>
      </p>
    </div>
  </div>
  )
}
