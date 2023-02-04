import Link from "next/link";

export default function login() {
  return (
    <>
        <form action="https://localhost:5000/login">
            <input type='text' placeholder="Username"/>
            <input type='password' placeholder="Password"/>
            {/* <input type="submit" value="Login"/> */}
            <Link href="/dashboard">Login</Link>
        </form>
    </>
  )
}
