import UserPicAndDesc from '../../(componets)/UserPicAndDesc'
import SocialLinks from '../../(componets)/UserSocialLinks'
import UserVisitedDebates from '../../(componets)/UserVisitedDebates.jsx'

export default function profile() {
  return (
    <div>
        <UserPicAndDesc />
        <SocialLinks />
        <UserVisitedDebates />
    </div>
  )
}
