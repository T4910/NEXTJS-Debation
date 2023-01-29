const express = require('express')
const router = express.Router()
const { v4: uuidV4 } = require('uuid');

// database
const Roomdb = require('../roomschema')


router.post('/', async (req, res) => {
    // console.log('13', req.body)
    
    // flash gets info for anonymous users
    if(!req.user){
      let [anonymous_info] = req.flash('infotorooms')
      req.flash('infotoroomsroomid', {id: anonymous_info.id, name: anonymous_info.name, tempUser: true, role: 'audience'})
      return res.redirect(307, `/room/${req.body.room_id}`)
    }

    // for room creator 
    let [adminrole] = req.flash('isAdmin')
    if(adminrole == true){
      const roomid = uuidV4()

      let room_data = {
        roomid: roomid, 
        topic: req.body.topic, 
        desc: req.body.description, 
        status: req.body.show_status, 
        creatorID: req.user[0]._id,
        judging: req.body.judging,
        groups: req.body['num-groups'],
        music: req.body['background-music']
      }

      // await insert_room_db(room_data)
      // await add_people(req.user[0]._id, req.user[0].username, req.user[0].tempUser, 'admin', roomid)

      req.flash('infotoroomsroomid', {id: req.user[0]._id, name: req.user[0].username, tempUser: req.user[0].tempUser, role: 'admin', roomdata: room_data});
      return res.redirect(307, `/room/${roomid}`)
    } else {
      const room_db = await Roomdb.findOne({room_id: req.body.room_id})

      if(room_db.banned.indexOf(req.user[0]._id) !== -1){
        req.flash('ban', 'sorry, you are banned')
        res.redirect('/')
        return
      }

      // await add_people(req.user[0]._id, req.user[0].username, req.user[0].tempUser, 'audience', req.body.room_id)
      req.flash('infotoroomsroomid', {id: req.user[0]._id, name: req.user[0].username, tempUser: req.user[0].tempUser, role: 'audience'})
      res.redirect(307, `/room/${req.body.room_id}`)
    }
});

  
router.post('/:roomid', async (req, res) => {
  const room_db = await Roomdb.findOne({room_id: req.params.roomid})
  if (room_db){
    if (room_db.timeend !== undefined){
      req.flash('notreal', 'Room does not exist')
      res.redirect('/')  
      return
    }
  }
  
  let [anoninfo] = req.flash('infotoroomsroomid')
  // console.log(anoninfo)
  let data = anoninfo;
  let peopleinroom = (room_db) ? (room_db.people.length > 1) : 0
  const beenherealready = (room_db) ? room_db.people.find(elem => elem.id.toString() == data.id.toString()) : false
  const peerids = {}
  
  if(room_db){
    room_db.people.forEach(people => {
      console.log('75 rooms.js',people.id.toString(), data.id.toString())
      if((people.peerID == undefined) || people.present !== true && people.id.toString() == data.id.toString()) return
      peerids[people.peerID] = {
        id: people.id.toString(),
        name: people.name.toString(),
        anonymous: people.anonymous.toString(),
        role: people.role.toString(),
        teamid: (people.teamid == undefined) ? "" : people.teamid.toString()
      }
    })
  }
      
      
  let colors = [
    '#e6194B',  //red
    '#4363d8',  //blue
    '#ffe119',  //yellow
    '#3cb44b',  //green
    '#f58231',  //orange
    '#911eb4',  //purple
    '#9A6324',  //brown
    '#f032e6',  //pink
    '#000000',  //black
    '#a9a9a9',  //grey
    '#ffffff'   //white
  ]
  

  res.render('room', {
    roomID: req.params.roomid, 
    orguserID: (beenherealready) ? beenherealready.id : data.id, 
    orguserNAME: (beenherealready) ? beenherealready.name : data.name, 
    orguserROLE: (beenherealready) ? beenherealready.role : data.role,
    orguserANON: (beenherealready) ? beenherealready.anonymous : data.tempUser,
    orguserTEAMID: (beenherealready) ? beenherealready.teamcolorID : data.teamcolorID,
    PEERIDSFORADMIN: (beenherealready) ? ((beenherealready.role == 'admin') ? JSON.stringify(peerids) : false) : false,
    roomINFO: JSON.stringify({
      topic: (data.role == 'admin') ? data.roomdata.topic : room_db.topic,
      judgingSYS: (data.role == 'admin') ? data.roomdata.judging : room_db.judgingsystem,
      desc: (data.role == 'admin') ? data.roomdata.desc : room_db.description,
      room_status: (data.role == 'admin') ? data.roomdata.status : room_db.visibility,
      groups: (data.role == 'admin') ? data.roomdata.groups : room_db.teams.length,
      music: (data.role == 'admin') ? data.roomdata.music : 0,
      teams: (data.role == 'admin') ? colors.slice(0, Number(data.roomdata.groups)) : room_db.teams,
      creator: (data.role == 'admin') ? data.roomdata.creatorID : room_db.creator,
      peopleinroom: (data.role == 'admin') && peopleinroom,
    })
  })
})
  












async function insert_room_db({roomid, topic, desc, status, creatorID, judging, groups}){
  let colors = [
    '#e6194B',  //red
    '#4363d8',  //blue
    '#ffe119',  //yellow
    '#3cb44b',  //green
    '#f58231',  //orange
    '#911eb4',  //purple
    '#9A6324',  //brown
    '#f032e6',  //pink
    '#000000',  //black
    '#a9a9a9',  //grey
    '#ffffff'   //white
  ]

  let teamsID = colors.slice(0, groups)

  await Roomdb.create({
    room_id: roomid,
    creator: creatorID,
    topic: topic,
    description: desc,
    visibility: (status == 'public') ? true : false,
    judgingsystem: judging,
    teams: teamsID
  })
}

async function add_people(personid, name, anonymous, role, room){
  const person = await Roomdb.findOne({room_id: room})
  person.people.push({
    id: personid, 
    name: name, 
    anonymous: anonymous, 
    role: role
  })
  await person.save()
  console.log(person)
}

function preventnonloggeduser(req, res, next){
  if(req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

module.exports = router