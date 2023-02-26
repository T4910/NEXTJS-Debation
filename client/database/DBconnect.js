import mongoose from "mongoose"

export default function () { mongoose.connect('mongodb://127.0.0.1/usersdb', () => {console.log('db connected')}, err => console.log(err))}

