import Link from 'next/link'
import LogOut from './logOut'

export default function DashboardNavBar() {
  return (
    <nav style={{backgroundColor: "#A05050"}}>
        <h2>Debation</h2>
        <ul>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/dashboard/profile">Profile</Link></li>
            <li><LogOut/></li>
        </ul>
    </nav>
  )
}
