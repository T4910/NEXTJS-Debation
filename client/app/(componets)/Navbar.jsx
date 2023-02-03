import Link from 'next/link'
import DropdownList from './DropdownList';


export default function Navbar(){
    let nav_dropdown_contents = [
        {
          dropdownname: 'About',
          dropdownlist: [
            {name: 'Company', url: '/about/about-company', id:1},
            {name: 'About Developer', url: '/about/about-developer', id:2}
          ]
        },
        {
          dropdownname: 'More',
          dropdownlist: [
            {name: 'Contact', url: 'info/contact', id:6},
            {name: 'Terms of Use policy', url: '/info/terms-of-use-policy', id:3},
            {name: 'Privacy policy', url: '/info/privacy-policy', id:4},
            {name: 'Copyright policy', url: '/info/copyright-policy', id:5},
          ]
        }
      ];

    return(
        <nav style={{backgroundColor: '#A05050'}}>
            <h1>Debation</h1>
            <Link href="/">Home</Link>
            <DropdownList list={nav_dropdown_contents}/>
            <Link href="/signings/login">Sign in</Link>
            <Link href="/signings/register">Sign out</Link>
        </nav>
    )
}