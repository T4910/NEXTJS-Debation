import mongoose, { Schema, model } from 'mongoose'

const Userschema = new Schema({
    username: String,
    email: String,
    password: String,
    datejoined: {
        type: Date,
        immutable: true,
        default: () => Date.now()
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
    wins: {
        type: Number,
        default: 0
    },
    debates: Array
})


export default mongoose.models.User || model('User', Userschema)