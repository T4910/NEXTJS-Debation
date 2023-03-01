import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

let secret =  process.env.NEXTAUTH_SECRET

export async function middleware(req) {
    const token = await getToken({ req, secret })
     if(!token) return NextResponse.redirect(new URL('/signings/login', req.url))
 
     return NextResponse.next()
}

export const config = { 
    matcher: ["/dashboard/:path*"],
}