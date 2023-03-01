import Image from 'next/image'

export default function UserDetailsClientComponent() {
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
          <i>JJ</i>
      </h3>
      <p>Userdatal</p>
      <p id="win-count">
        Win count: <span>0</span>
      </p>
    </div>
  </div>

  )
}
