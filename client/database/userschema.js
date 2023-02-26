import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const Userschema = new Schema({
    username: String,
    email: String,
    password: String,
    datejoined: {
        type: Date,
        immutable: true,
        default: () => Date.now
    },
    imgPath: String,
    socials:{
        facebook: String,
        linkedin: String,
        instagram: String,
        twitter: String,
        website: String
    },
    description: String,
    wins: Number,
    debates: Array
})

Userschema.pre('save', async (next) => {
    if(!this.isModified('password')) next()
    
    this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.models.User || model('User', Userschema)