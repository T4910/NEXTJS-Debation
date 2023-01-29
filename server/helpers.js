// middleware function that prevent unauthorized users from entering private pages
function preventnonloggeduser(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/login')
}

// middlware function that prevents authorized users from loging out accidentally
function preventloggeduser(req, res, next){
  if(req.isAuthenticated()) return res.redirect('/'); 
  next()
}

// deletes images from images path on the server
function deleteprevimg(imgpath){
  const pathtoimg = `./public/images/${imgpath}`
  try {
    console.log(`Deleting... ${imgpath}`)
    fs.unlinkSync(pathtoimg)
  } catch(err) {
    console.log("not found", err)
  }
}

// makes a new entry of a room into the database 
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

  console.log(teamsID)
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

//  checks the database for if a username is taken
async function usernametaken(name){
  const namecheck = await Userdb.find({ username: name })
  console.log('189 server.js', namecheck.length)
  if(namecheck.length == 0) return false
  return true
}

// checks for the user's name in the database
async function identifyuser(person){
  const obj = await Userdb.find({ username: person })
  return obj
}

// checks for the user's id in the database
async function identifyid(id){
  const obj = await Userdb.find({ _id: id })
  return obj
}