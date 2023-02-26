import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import UserDB from '../../../database/userschema'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'



export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        mongoose.connect('mongodb://127.0.0.1/usersdb', () => {console.log('db connected')}, err => console.log(err))

        const {username, password} = credentials;
        
        const user = await UserDB.findOne({ username })
        
        if(!user) throw new error('Invalid user')
        if(!await bcrypt.compare(password, user.password)) throw new error('Invalid user or password')
        if(!user) return
                
        const neededDetails = {
          email: {
            username: user.username,
            email: user.email,
            image: user.imgPath,
            wins: user.wins
          },
          j: 'k'
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