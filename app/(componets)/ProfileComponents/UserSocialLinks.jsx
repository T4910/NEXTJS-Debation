'use client'
import Social from './Social'

/**
 * for the socail link element, make it so that it looks like a
 * seperate page entirely like that of the linkedIn page, isolate
 * it from the other page when styliing and add the debation p
 * profile link to it too
 */

export default function SocialLinks({socials, socialElement}) {
  let profileLink = 'https://debation.com'  //replace this link with users profile link
  return (
    <div>
      <p>Socials</p>
      <button onClick={() => socialElement(false)}>X</button>
      <Social name={'Debation'} link={profileLink}/> 
      {
        (socials)
        ?Object
        .keys(socials)
        .map((name, index) => 
            <Social 
              key={index}
              name={name}
              link={socials[name]}
            />
          )
        :'loading...'
      }
    </div>
  )
}
