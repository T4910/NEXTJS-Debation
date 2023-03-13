import  UserDetailsCard from './UserDetails'
import  UserDesc from './UserDescription'

export default function UserPicAndDesc({description, ...otherDetails}) {
  return (
    <div>
      <UserDetailsCard {...otherDetails}/>
      <UserDesc desc={description}/>
    </div>
  )
}
