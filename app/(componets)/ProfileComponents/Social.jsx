import Link from 'next/link'

export default function Social({name, link}) {
  return (
    (link !== '') && <div>{name}: <Link href={link}>{link}</Link></div>
  )
}
