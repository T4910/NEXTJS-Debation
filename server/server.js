const express = require('express')
const app = express()

// DATABASE CODE
const mongoose = require('mongoose')
// const Userdb = require('./userschema')
// const Roomdb = require('./roomschema')
mongoose.connect('mongodb://127.0.0.1/usersdb', () => {console.log('db connected')}, err => console.log(err))

app.use(express.json())

app.get('/availableRooms', (rq, rs) => {
  rs.json({d: 'Hello World!'})
})

app.listen(3001, () => console.log(`Example app listening on port ${3001}`))