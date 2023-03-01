import UserPicAndDesc from '../../(componets)/ProfileComponents/UserPicAndDesc'
import SocialLinks from '../../(componets)/ProfileComponents/UserSocialLinks'
import UserVisitedDebates from '../../(componets)/ProfileComponents/UserVisitedDebates.jsx'

export default function profile() {
  return (
    <div>
        <UserPicAndDesc />
        <SocialLinks />
        <UserVisitedDebates />
    </div>
  )
}
