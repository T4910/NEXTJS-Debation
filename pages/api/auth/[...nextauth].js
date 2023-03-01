import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import UserDB from '../../../database/userschema'
import DBconnect from '../../../database/DBconnect'
import bcrypt from 'bcryptjs'



export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        DBconnect()

        const {username, password} = credentials;
        
        const user = await UserDB.findOne({ username })
        
        if(!user) throw new error('Invalid user')
        if(!await bcrypt.compare(password, user.password)) throw new error('Invalid user or password')
        if(!user) return
                
        const neededDetails = {
          email: {
            ID: user._id
          },
        }
        
        return neededDetails
      }
    })
    // ...add more providers here
  ],
  pages: {
    signIn: '/signings/login',
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)