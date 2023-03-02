import Navbar from './(componets)/Navbar';
import db from '../database/DBconnect';

db()
export default function Page() {
    return (
        <>
            <Navbar />
            <p>This is the first page that the user gets to talks about somethings before they are compelled to sign up in the login in page</p>
            <p>lorem about sha</p>
        </>
    ) 
  }