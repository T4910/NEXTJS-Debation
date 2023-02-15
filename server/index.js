// checks if project not in production in other to use default environment variables
let options;
if('production'/*process.env.NODE_ENV */!== 'production'){
  require('dotenv').config()
  
}
const fs = require('fs');

options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
}



const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const app = express();
const Jimp = require('jimp')

// HTTPS DEV SERVER
const server = require('https').createServer(options, app)

// Connecting socket.io to server
const io = require('socket.io')(server)

// file (PROFILE IMAGES) uploader
const {v4: uuidV4} = require('uuid')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${uuidV4()}.jpg`)
  }
})

const upload =  multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
        return cb(null, true);
    }
  
    cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
  } 

}).single('prfimg')


// DATABASE CODE
const mongoose = require('mongoose')
const Userdb = require('./userschema')
const Roomdb = require('./roomschema')
mongoose.connect(process.env.DATABASE_URL, () => {console.log('db connected')}, err => console.log(err))

async function identifyuser(person){
  const obj = await Userdb.find({ username: person })
  return obj
}

async function identifyid(id){
  const obj = await Userdb.find({ _id: id })
  return obj
}

const initPassport = require("./passport-config")
initPassport(passport, identifyuser, identifyid)


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', preventnonloggeduser, async (req, res) => {
  const rooms = await Roomdb.find({visibility: true})
  res.render('main', {
    rooms: rooms
  })
})

app.get('/availableRooms', async (req, res) => {
  const rooms = await Roomdb.find({visibility: true})

  res.json({...rooms})
})

app.get('/profile', preventnonloggeduser, async (req, res) => {
  const dataextract = await Userdb.findOne({_id: req.user[0]._id})

  res.render('profile', {
    name: req.user[0].username, 
    id: req.user[0]._id, 
    date: req.user[0].datejoined, 
    email: req.user[0].email,
    imgPath: dataextract.imgPath,
    socials: {
      facebook: dataextract.socials.facebook,
      linkedin: dataextract.socials.linkedin,
      instagram: dataextract.socials.instagram,
      twitter: dataextract.socials.twitter,
      website: dataextract.socials.website
    },
    socials_list: [
      {social: 'facebook', link: dataextract.socials.facebook},
      {social: 'linkedin', link: dataextract.socials.linkedin},
      {social: 'instagram', link: dataextract.socials.instagram},
      {social: 'twitter', link: dataextract.socials.twitter},
      {social: 'website', link: dataextract.socials.website}
    ],
    description: dataextract.description,
    wins: 0,
    debates: dataextract.debates
  })
})
.post('/profile', preventnonloggeduser, async (req, res) => {
  if(req.body.checking_profile == true){
    let person_profile;
    try{person_profile = await Userdb.findOne({_id: req.body.searched_id.toString()})}
    catch(e){
      res.json({error: 'error occured'})
    }
    
    res.json({
      name: person_profile.username, 
      date: person_profile.datejoined, 
      email: person_profile.email,
      imgPath: person_profile.imgPath,
      description: person_profile.description,
      debates: person_profile.debates.slice(-4, -1),
      wins: person_profile.wins,
      socials: [
        {social: 'facebook', link: person_profile.socials.facebook},
        {social: 'linkedin', link: person_profile.socials.linkedin},
        {social: 'instagram', link: person_profile.socials.instagram},
        {social: 'twitter', link: person_profile.socials.twitter},
        {social: 'website', link: person_profile.socials.website}
      ]
    })
  }
})

// Signing routers
const signRouters = require('./routes/signings.js')
app.use('/', signRouters)

// Room routers
const roomRouter = require('./routes/rooms.js');
app.use('/room', roomRouter)

app.get('/room/:roomid', preventnonloggeduser, (req, res) => {
  res.redirect('/')
})



// // EDIT profile
// app.post('/fillprofile', preventnonloggeduser, async (req, res) => {
//   const userprf = await Userdb.findOne({_id : req.user[0]._id});

//   // check this logic list later
//   (req.body.facebook == '') ? userprf.socials.facebook = "" : userprf.socials.facebook = req.body.facebook;
//   (req.body.linkedin == '') ? userprf.socials.linkedin = "" : userprf.socials.linkedin = req.body.linkedin;
//   (req.body.instagram == '') ? userprf.socials.instagram = "" : userprf.socials.instagram = req.body.instagram; 
//   (req.body.twitter == '') ? userprf.socials.twitter = "" : userprf.socials.twitter = req.body.twitter; 
//   (req.body.web == '') ? userprf.socials.website = "" : userprf.socials.website = req.body.web; 
//   (req.body.desc == '') ? userprf.description = "" : userprf.description = req.body.descr;  
//   if(req.body.name != '') if(!await usernametaken(req.body.name)) userprf.username = req.body.name;
//   (req.body.email != '') ? userprf.email = req.body.email : undefined;  
  
//   await userprf.save()

//   res.redirect('/profile')
// })

// async function usernametaken(name){
//   const namecheck = await Userdb.find({ username: name })
//   console.log('189 server.js', namecheck.length)
//   if(namecheck.length == 0) return false
//   return true
// }

// // UPLOAD profile photo 
// app.post('/upload', preventnonloggeduser, async (req, res) => {    

//   const updatedoc = await Userdb.findOne({_id : req.user[0]._id})

//   upload(req, res, async (err) => {
//     console.log(req.file.filename)
//     if (updatedoc.imgPath != ''){
//       deleteprevimg(updatedoc.imgPath)
//     }

//     updatedoc.imgPath = await resize(150, 150, req.file.filename)
//     await updatedoc.save()

//     return (err) ? res.send(err) : res.redirect('/profile')
//   })
  
//       // resizing and upgrade of photo
//      async function resize(x, y, path) {
//       // generate random photo id for user
//        const imgID = `${uuidV4()}.jpg`;

//        // Reading Image
//      const image = await Jimp.read(`${__dirname}/public/images/${path}`);

//        // Used RESIZE_BEZIER as cb for finer images
//        image.resize(x, y, Jimp.RESIZE_BEZIER, function(err){
//             if (err) throw err;
//          })
//          .write(`${__dirname}/public/images/${imgID}`);

//         deleteprevimg(path)
//          return imgID
//       }    
// })
    

// // CONFIGURATION page
// app.post('/config', preventnonloggeduser, (req, res) => {

//   const [status, topic, desc] = [
//     encodeURIComponent(req.body.show_status), 
//     encodeURIComponent(req.body.topic),
//     encodeURIComponent(req.body.description),
//   ]

//   const queries = {
//       "status": status,
//       "topic": topic,
//       "description": desc,
//       "role": 'admin'
//   }

//   const irl = new URLSearchParams(queries).toString()

//   req.flash('isAdmin', true)
//   res.redirect(307, '/room?'+irl)

// })

// // ADDING users to room
// app.post('/joinroom', /*preventnonloggeduser,*/ async (req, res) => {  
//   const roomdb = await Roomdb.find({room_id: req.body.room_id})

//   if (roomdb == ""){
//     req.flash('notreal', 'Room does not exist');
//     (!req.user) ? res.redirect('/anonymous') : res.redirect('/')  
//     return
//   }

//   const queries = {
//     "role": encodeURIComponent('basic'),
//     "ROOMID": encodeURIComponent(req.body.room_id),
//   }

//   const irl = new URLSearchParams(queries).toString()
//   // console.log(irl)

//   let [anonymous_info] = req.flash('infotojoinroom')
//   req.flash('infotorooms', anonymous_info)
//   req.flash('isAdmin', false)
//   res.redirect(307, '/room?'+irl)
// })

// app.post('/changerole', preventnonloggeduser, async (req, res) => {
//   const room_db = await Roomdb.findOne({room_id: req.body.roomID})
//   let present_people = room_db.people
//   let indexx;

//   present_people.forEach((item, index) => {
//     // console.log(req.body.person_id)
//     if(item.id == req.body.person_id){
//       indexx = index
//     } 
//   })

//   // console.log(req.body.new_role)
//   // console.log(present_people)
//   present_people[indexx].role = req.body.new_role

//   await room_db.save()

//   io.to(req.body.roomID).emit('update-role', req.body.call_id, req.body.new_role)
// })

// async function insert_room_db({roomid, topic, desc, status, creatorID, judging, groups}){
//   let colors = [
//     '#e6194B',  //red
//     '#4363d8',  //blue
//     '#ffe119',  //yellow
//     '#3cb44b',  //green
//     '#f58231',  //orange
//     '#911eb4',  //purple
//     '#9A6324',  //brown
//     '#f032e6',  //pink
//     '#000000',  //black
//     '#a9a9a9',  //grey
//     '#ffffff'   //white
//   ]

//   let teamsID = colors.slice(0, groups)

//   console.log(teamsID)
//   await Roomdb.create({
//     room_id: roomid,
//     creator: creatorID,
//     topic: topic,
//     description: desc,
//     visibility: (status == 'public') ? true : false,
//     judgingsystem: judging,
//     teams: teamsID
//   })
// }

// // checks for socket connections in stream rooms
// // userID refers to the peer id given to the user joining
// io.on('connection', socket => {
//   socket.on("connect_error", err => console.log(err))
//   socket.on('join-room', async (roomID, userID, MAIN_IDS) => {
//     socket.join(roomID)

//     const userdb = await Userdb.findOne({_id: MAIN_IDS.id})
//     let room_db = await Roomdb.findOne({room_id: roomID})

//     // if the person is the creator of the room and the room has not been created, create a new room
//     // and change room_db value to the new room for further usage
//     if(MAIN_IDS.id == MAIN_IDS.roominfo.creator && room_db == null){
//       await insert_room_db({
//         roomid: roomID, 
//         topic: MAIN_IDS.roominfo.topic, 
//         desc: MAIN_IDS.roominfo.desc, 
//         status: MAIN_IDS.roominfo.room_status, 
//         creatorID: MAIN_IDS.roominfo.creator, 
//         judging: MAIN_IDS.roominfo.judgingSYS, 
//         groups: MAIN_IDS.roominfo.groups
//     })
//       room_db = await Roomdb.findOne({room_id: roomID});
//     }

//     // ensures that the person is not already in the room
//     let person = room_db.people.find(elem => elem.id.toString() == MAIN_IDS.id.toString())
//     if (!person) {
//         // adds person to the room's members list in the database
//         room_db.people.push({
//           id: MAIN_IDS.id, 
//           name: MAIN_IDS.name, 
//           anonymous: MAIN_IDS.anonymous, 
//           role: MAIN_IDS.role,
//           peerID: userID,
//           present: true
//         })
    
//       // save current user debate to users database and prevents saving to anonymous users
//       // console.log(userdb);
//       if(userdb.tempUser == false){
//         console.log('saved')
//         userdb.debates = [...userdb.debates, {
//           topic: room_db['topic'],
//           description: room_db['description'],
//           room_id: room_db['room_id'],
//           timestart: room_db['timestarted'],
//           role: room_db.people.filter((people) => { return people.id == MAIN_IDS.id})[0].role, //role of the person in the debate
//           timeend: room_db['timeend'],
//           winners: room_db['winteam'],
//           visibility: room_db['visibility']
//       }]}
  
//       await room_db.save()
//       await userdb.save()
//       person = room_db.people.find(elem => elem.id.toString() == MAIN_IDS.id.toString())
//     }


//     // connect the user to the room network 
//     socket.broadcast.to(roomID).emit('user-connected', userID, MAIN_IDS)
//     console.log(`\nUser ${MAIN_IDS.id} CONNECTED. \nPEERID: ${userID}, \nROOMID: ${roomID}\n`)

//     // checks whether creator of the debate joined the room
//     console.log('390 server.js', person.present, person.id.toString(), room_db.creator.toString())
//     if(person.present == false && person.id.toString() == room_db.creator.toString()){
//       console.log("reverted")
//       socket.to(roomID).emit('adminfuncs', {title: 'revertTerminaton'})
//     }
    
//     // changes database status present to true
//     person.peerID = userID // updates the peerID in the database
//     person.present = true
//     await room_db.save()
    
//     // sends a list of peerID to the admin if previously disconnected for the admin to call in script.js
//     // socket.on('Adminisback', (e) => {
//     //   console.log('Sending list of peerID to admin');
      
//     //     console.log('admin is back')
//     //     socket.in(roomID).emit('participants_connected', peerids)
//     // })

//     socket.on('toggle_mute', (peerid, toggle) => {
//       // let toggle = true
//       if(toggle){
//         // socket.broadcast.to(roomID).emit("admin_mute", peerid)
//         toggle = false
//       } else {
//         socket.broadcast.to(roomID).emit("admin_unmute", peerid)
//         // toggle = true
//       }
//     })

//     socket.on('adminpower', async (command, serverinfo) => {
//       switch (command.title){
//         case 'mutechat':
//           socket.to(roomID).emit("adminfuncs", command)
//           break;
//         case 'changerole':
//           const room_db = await Roomdb.findOne({room_id: serverinfo.roomID})
//           // let present_people = room_db.people
//           let theperson = room_db.people.find(item => item.id == serverinfo.person_id)

//           theperson.role = serverinfo.new_role
//           if(serverinfo.new_role == 'speaker') theperson.vote = 0
//           if(serverinfo.new_team) theperson.teamcolorID = serverinfo.new_team

//           await room_db.save()

//           userdb.debates.filter((debate) => {return debate.room_id == roomID})[0].role = serverinfo.new_role
//           await userdb.save()

//           socket.to(roomID).emit('adminfuncs', command)
//           break;
          
//         case 'startvideo':
//           socket.to(roomID).emit('adminfuncs', command)
//           break;

//         case 'enablevid':
//           socket.to(roomID).emit('adminfuncs', command)
//           break;

//         case 'endroomforall':
//           socket.to(roomID).emit('adminfuncs', command)
//           break;
        
//         case 'ban':
//           const room_d = await Roomdb.findOne({room_id: roomID})
//           socket.to(roomID).emit('adminfuncs', command, serverinfo)
//           room_d.banned.push(serverinfo.person_id)
//           await room_d.save()
//           break;
        
//           case 'unban':
//             let room = await Roomdb.findOne({room_id: roomID})
//             // socket.to(roomID).emit('adminfuncs', command, serverinfo)
//             room.banned = room.banned.filter((people) => people.toString() != serverinfo.person_id.toString())
//             // banned = new_banned_list
            
//             await room.save()
//             break;

//         case 'speakingevent':
//           socket.to(roomID).emit('adminfuncs', command)
//           break;
//      }
//     })

//     socket.on('endcall', (id) => {
//       socket.to(roomID).emit('callended', id)
//     })

//     socket.on('scheduleinterupted', () => {
//       socket.to(roomID).emit('scheduleinterupt')
//     })

//     socket.on('sent_rating', async (rating, realid) => {
//       const room_db = await Roomdb.findOne({room_id: roomID})
//       const data = room_db.people.find(elem => elem.id.toString() == realid.toString())
//       console.log(data.vote)
//       data.vote += rating 
//       console.log(data.vote, rating)
//       await room_db.save()
//     })
    
//     socket.on('sendMESSAGE', (message) => {
//       // console.log(`From ${message.name}: ${message.message} to room of ID ${message.roomID}`);
//       socket.to(message.roomID).emit("Addmessage", message)
//     })

//     socket.on('send_connection_list', (list, peerid) => {
//       socket.broadcast.to(roomID).emit("connectionlist", list, peerid)
//     })

//     socket.on('disconnect', async () => {
//       const room_db = await Roomdb.findOne({room_id: roomID})
//       const user_db = await Userdb.findOne({id: MAIN_IDS.id})

//       if(!room_db || !user_db) return

//       const person = room_db.people.find(elem => elem.id.toString() == MAIN_IDS.id.toString())
//       person.present = false
//       await room_db.save()

//       const anyadmin = room_db.people.filter(elem => {
//         return elem.role.toString() == 'admin' && elem.present.toString() == 'true'
//       })

//       const anypresent = room_db.people.filter(elem => {
//         return elem.present.toString() == 'true'
//       })


//       if ((room_db !== '' && MAIN_IDS.id == room_db.creator && anyadmin.length == 0) || anyadmin.length < 1){
//         socket.to(roomID).emit('adminfuncs', {title: 'endroomforall'})
//       }
      
//       // signs out anonymous user
//       if(MAIN_IDS.anonymous == 'true'){
//         console.log('deleted a person from the database')
//         await user_db.deleteOne({id: MAIN_IDS.id})
//       } 

//       socket.broadcast.to(roomID).emit('user-disconnected', userID)
//       socket.leave(roomID)
//       console.log(userID +' disconnected')


      
//       if(anypresent.length < 1){
//         let endingDate = new Date(Date.now())
//         room_db.people.forEach(async (person) => {
//           let userdoc = await Userdb.findOne({_id: person.id})
//           if (!userdoc) return
//           if(userdoc.tempUser) return
//           userdoc.debates.find((debate) => {return debate.room_id == roomID}).timeend = endingDate;//inserts the ending date
//           userdoc.markModified('debates')
//           await userdoc.save()
//         })
//         await room_db.deleteOne({ room_id: roomID });
//         return
//       }

//       if(anypresent.length == 1) socket.to(roomID).emit('cleared')
//     })
//   })
// });


// // middleware function that prevent unauthorized users from entering private pages
// function preventnonloggeduser(req, res, next){
//   if(req.isAuthenticated()) {
//     // console.log(req.session.passport)
//     return next()
//   }

  // if(req.user){
  //   console.log(0)
  // } else {
  //   console.log('gone through')
    
  //   next()
  // }

  // console.log(req.session.passport)
//   console.log('you are not logged in')

//   res.redirect('/login')
// }

// middlware function that prevents authorized users from loging out accidentally
function preventloggeduser(req, res, next){
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}

// delete images
function deleteprevimg(imgpath){
  const pathtoimg = `./public/images/${imgpath}`

  try {
    console.log(`Deleting... ${imgpath}`)
    fs.unlinkSync(pathtoimg)
  } catch(err) {
    console.log("not found")
  }
}


// VIDEO CONFERECE CONFIGURATIONS
const { ExpressPeerServer } = require('peer');
const { info } = require('console');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
app.use('/room', peerServer)


server.listen(4000)


