import Link from 'next/link'

export default function DashboardNavBar() {
  return (
    <nav style={{backgroundColor: "#A05050"}}>
        <h2>Debation</h2>
        <ul>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/dashboard/profile">Profile</Link></li>
            <li><Link href="/">Log Out</Link></li>
        </ul>
    </nav>
  )
}
