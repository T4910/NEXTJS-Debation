import  UserDetails from './UserDetails'
import  UserDesc from './UserDescription'

export default function UserPicAndDesc({ID}) {
  return (
    <div>
      <UserDetails ID={ID}/>
      <UserDesc />
    </div>
  )
}
