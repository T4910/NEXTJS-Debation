import mongoose from "mongoose"

export default function () { mongoose.connect(process.env.DATABASE_URL, () => {console.log('db connected')}, err => console.log(err))}

