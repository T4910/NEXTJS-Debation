import Link from 'next/link'

export default function HeaderFunctions() {
  return (
    <div style={{backgroundColor: 'brown'}}>
        <h2>Debation</h2>
        <button>Notifcation Icon</button>
        <button><Link href="/dashboard">Leave</Link></button>
        <button style={{
            display: 'none'
        }}>Leave for all</button>
    </div>
  )
}
