class UserRoomFuncs {
    constructor(peerid, main_ids) {
       this.peerid = peerid;
       this.realid = main_ids.id;
       this.name = main_ids.name;
       this.role = main_ids.role;
       this.anonymous = main_ids.status;
       this.teamid = main_ids.teamid;
       this.roominfo = ROOMINFO;
    }

    async buildconnection(people_list, justvid){
        let call;
        console.log(videoenabled)
        if(videoenabled){
            const myvid = document.createElement('video')
            video_active = true

            try{
                thestream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
                videostream(myvid, thestream, this.name, this.peerid)
            
                socket.on('admin_mute', (id) => {
                    if (this.peerid == id){
                        admin_muted = true;
                        thestream.getVideoTracks()[0].enabled = false;
                        // stream.getAudioTracks()[0].enabled = false;
                    }
                })
                
                socket.on('admin_unmute', (id) => {
                    if (this.peerid == id){
                        admin_muted = false;
                        thestream.getVideoTracks()[0].enabled = false;
                        // stream.getAudioTracks()[0].enabled = false;
                    }
                })

            } catch(err) {
                roomfunc.defaultNotification('Camera being used by another application', 
                'Sorry, your camera is being used by another appliction, please close the application using your camera and try again',
                'error'
            )}

            // if a list is enabled call everyone that is on that list
            if(people_list){
                console.log('calling people')
                for(let peerid in people_list){
                    call = roomPeer.call(peerid, thestream, {
                        metadata: {
                            'callersname': this.name, 
                            'callersid': this.realid, 
                            'callerspeerid': this.peerid, 
                            'callersrole': this.role, 
                            'callersanon': this.anonymous    
                        }
                    })
                }
            }
        }
        // this line below prevents the user from creating new socket and peerjs eventlisteners
        if(justvid) return

        console.log('listening for new connections')
        // WHEN A NEW USER CONNECTS
        socket.on('user-connected', (userID, main_ids) => {  
            // console.log('listening for new connections')
            // adding people to the fluid connected list
            participants_connected[userID] = main_ids
            this.addtoparticipantlist(userID, main_ids)

            // prevents further code from exectuing if role requirement isn't met
            if(!videoenabled) return

            console.log('SOMEONE CONNECTED')
            if(this.role == 'admin'){
                console.log('sending participants list')
                console.log(participants_connected)
                let tempobj = {...participants_connected}
                delete tempobj[userID]
                socket.emit('send_connection_list', tempobj, userID)
            }                 
        
            // calls the person that connected 
            call = roomPeer.call(userID, thestream, {
                metadata: {
                    'callersname': this.name, 
                    'callersid': this.realid, 
                    'callerspeerid': this.peerid, 
                    'callersrole': this.role, 
                    'callersanon': this.anonymous
                }
            })    

            

            console.log(userID + ' connected')
            console.log('Youre calling.....')

            // all calls
            peersconnected[userID] = call

            // adding people to the rigid connected list
            participants_connected_log[userID] = main_ids

        
            call.on('close', () => {
                try{
                    console.log('close called')
                    // delete participants_connected[userID];
                     document.querySelector(`div#us${userID}er`).remove()
                 } catch(e){console.error('error removing video and participant list')}
                
                console.log(`\nclosed  ${userID}\n`)
            })   
        })

        // When a user disconnects
        socket.on('user-disconnected', (peerID) => {
            console.log(peerID + ' left')
            try{
               delete participants_connected[peerID];
                document.querySelectorAll(`#us${peerID}er`)
                .forEach(elem => {                
                    elem.remove()
                })
            } catch(e){console.error('error removing video and participant list')}
        })

        // Gets a list of previous connections
        socket.on('connectionlist', (list, peerid) => {
            if(videoenabled){
                console.log(`sent connecteed list to ${peerid}`)
                if (users_peer_number == peerid){
                    console.log(`connected ${list}`)
                }

                return
            }

            if (users_peer_number == peerid){
                for(let obj in list){
                    this.addtoparticipantlist(obj, list[obj])
                    participants_connected[obj] = list[obj]
                }
            }
        })

        // When you receive a call
        roomPeer.on('call', callobj => {
            callobj.answer()
            console.log("you're being called and we're answering for you......")

            // gets stream and name of the caller then adds it to vidspace 
            const sentvideostream = document.createElement('video')
            callobj.on('stream', receivedvidstream => {
                console.log("callers name"+callobj.metadata)
                videostream(sentvideostream, receivedvidstream, callobj.metadata.callersname,  callobj.metadata.callerspeerid)
            })
        })
    }

    async buildstreamerconnection(people_list, repeat){
        const myvid = document.createElement('video')
        video_active = true
        let call;
        // let thestream

        try{
            thestream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
            videostream(myvid, thestream, this.name, this.peerid)
        
            socket.on('admin_mute', (id) => {
                if (this.peerid == id){
                    admin_muted = true;
                    thestream.getVideoTracks()[0].enabled = false;
                    // stream.getAudioTracks()[0].enabled = false;
                }
            })
            
            socket.on('admin_unmute', (id) => {
                if (this.peerid == id){
                    admin_muted = false;
                    thestream.getVideoTracks()[0].enabled = false;
                    // stream.getAudioTracks()[0].enabled = false;
                }
            })

        } catch(err) {
            roomfunc.defaultNotification('Camera being used by another application', 
            'Sorry, your camera is being used by another appliction, please close the application using your camera and try again',
            'error'
        )}

        // if a list is enabled call everyone that is on that list
        if(people_list){
            for(let peerid in people_list){
                call = roomPeer.call(peerid, thestream, {
                    metadata: {
                        'callersname': this.name, 
                        'callersid': this.realid, 
                        'callerspeerid': this.peerid, 
                        'callersrole': this.role, 
                        'callersanon': this.anonymous    
                    }
                })
            }
        }

        // this line below prevents the user from creating new socket and peerjs eventlisteners
        if(repeat) return


            // WHEN A NEW USER CONNECTS
            socket.on('user-connected', (userID, main_ids) => {  
                console.log('SOMEONE CONNECTED')
                if(this.role == 'admin'){
                    console.log('sending participants list')
                    console.log(participants_connected)
                    socket.emit('send_connection_list', participants_connected, userID)
                }                 
            
                // calls the person that connected 
                call = roomPeer.call(userID, thestream, {
                    metadata: {
                        'callersname': this.name, 
                        'callersid': this.realid, 
                        'callerspeerid': this.peerid, 
                        'callersrole': this.role, 
                        'callersanon': this.anonymous
                    }
                })    

                

                console.log(userID + ' connected')
                console.log('Youre calling.....')

                // all calls
                peersconnected[userID] = call

                // adding people to the fluid connected list
                participants_connected[userID] = main_ids
                this.addtoparticipantlist(userID, main_ids)

                // adding people to the rigid connected list
                participants_connected_log[userID] = main_ids

            
                call.on('close', () => {
                    try{
                        console.log('close called')
                        // delete participants_connected[userID];
                         document.querySelector(`div#us${userID}er`).remove()
                     } catch(e){console.error('error removing video and participant list')}
                    
                    console.log(`\nclosed  ${userID}\n`)
                })   
            })

            // When a user disconnects
            socket.on('user-disconnected', (peerID) => {
                console.log(peerID + ' left')
                try{
                   delete participants_connected[peerID];
                    document.querySelectorAll(`#us${peerID}er`)
                    .forEach(elem => {                
                        elem.remove()
                    })
                } catch(e){console.error('error removing video and participant list')}
                // if(peersconnected[peerID]) peersconnected[peerID].close()
            })

            // Gets a list of previous connections
            socket.on('connectionlist', (list, peerid) => {
            console.log(`sent connecteed list to ${peerid}`)
                if (users_peer_number == peerid){
                    console.log(`connected ${list}`)
                }
            })

            // When you receive a call
            roomPeer.on('call', callobj => {
                callobj.answer()
                console.log("you're being called and we're answering for you......")

                // gets stream and name of the caller then adds it to vidspace 
                const sentvideostream = document.createElement('video')
                callobj.on('stream', receivedvidstream => {
                    console.log("callers name"+callobj.metadata)
                    videostream(sentvideostream, receivedvidstream, callobj.metadata.callersname,  callobj.metadata.callerspeerid)
                })
            })        
    }

    buildnonstreamerconnection(){
        socket.on('user-connected', (userID, main_ids) => { 
            participants_connected[userID] = main_ids
            this.addtoparticipantlist(userID, main_ids)
        })

        roomPeer.on('call', callobj => {
            callobj.answer()
            console.log("you're being called and we're answering for you......")

            // gets stream and name of the caller then adds it to vidspace 
            const sentvideostream = document.createElement('video')
            callobj.on('stream', receivedvidstream => {
                console.log("callers name"+callobj.metadata.callersname)
                videostream(sentvideostream, receivedvidstream, callobj.metadata.callersname,  callobj.metadata.callerspeerid)
            })
            
            // callobj.on('close', () => {
            //     console.log('aaaa')
            // })
        })

        // get a list of previously connected lists
        socket.on('connectionlist', (list, peerid) => {
            console.log(`sent connected list`)
            if (users_peer_number == peerid){
                for(let obj in list){
                    this.addtoparticipantlist(obj, list[obj])
                    participants_connected[obj] = list[obj]
                }
            }
        })

        // disconnects the users and removes the video from the users vidspace
        socket.on('user-disconnected', (peerID) => {
            console.log(peerID + ' left')
            try{
                delete participants_connected[peerID];
                document.querySelectorAll(`#us${peerID}er`)
                .forEach(elem => {                
                    elem.remove()
                })
            } catch(e){console.error('error removing video and participant list')}
        })
    }

    addtoparticipantlist(peerid, MAIN_IDS){
        console.log(`forming participant....${MAIN_IDS.name}`)
        if(this.peerid != peerid && ((this.role == MAIN_IDS.role && this.teamid == MAIN_IDS.teamid) || this.role == 'admin' || MAIN_IDS.role == 'admin')){
            // let nonetext = document.createTextNode('none')
            // let none = document.createElement('option')
            // none.setAttribute('value', "")
            // option.appendChild(nonetext)
            // document.querySelector('#seleteduser').appendChild(none)
            selectedchat(peerid, MAIN_IDS)
        }

        let li = document.createElement('li')
        let list_div = document.createElement('div')

        let username = document.createElement('p')
        let userrole = document.createElement('p')
        let view_profile = document.createElement('button')
        let btntext = document.createTextNode('View profile')
        let nametext = document.createTextNode(MAIN_IDS.name)
        let roletext = document.createTextNode(MAIN_IDS.role)


        userrole.setAttribute('id', 'userrole')
        view_profile.setAttribute('id', 'show_profile')
        view_profile.setAttribute('onclick', `show_profile(this, '${peerid}' )`)

        username.appendChild(nametext)
        userrole.appendChild(roletext)
        view_profile.appendChild(btntext)

        
        list_div.appendChild(username)
        list_div.appendChild(userrole)
        if (MAIN_IDS.anonymous){list_div.appendChild(view_profile)}


        // ADMIN FUNCTIONS
        if (this.role == 'admin'){    
            if(MAIN_IDS.role == 'speaker') selectedspeakers(peerid, MAIN_IDS)

            let change_role = document.createElement('button')
            let end_show_video = document.createElement('button')
            let admin_mute = document.createElement('button')
            let chat_mute = document.createElement('button')
            let ban = document.createElement('button')
            
            let selectrole = document.createElement('select')
            let roles = ['speaker', 'judge', 'admin', 'audience']
            for(let i = 0; i < roles.length; i++){
                let optionrole = document.createElement('option')
                let speakrole = document.createTextNode(roles[i])
                optionrole.setAttribute('value', roles[i])
                optionrole.append(speakrole)
                selectrole.appendChild(optionrole)
            }
            
            let selectcolorgroup = document.createElement('select')
            let colors = {
                '#e6194B':'red',  
                '#4363d8':'blue',  
                '#ffe119':'yellow',  
                '#3cb44b':'green',  
                '#f58231':'orange',  
                '#911eb4':'purple',  
                '#9A6324':'brown',  
                '#f032e6':'pink',  
                '#000000':'black',  
                '#a9a9a9':'grey',  
                '#ffffff':'white' 
              }

              
            for(let i = 0; i < this.roominfo.teams.length; i++){
                let optioncolor = document.createElement('option')
                let color = document.createTextNode(colors[this.roominfo.teams[i]])
                optioncolor.setAttribute('value', this.roominfo.teams[i])
                optioncolor.append(color)
                selectcolorgroup.appendChild(optioncolor)
            }
        
        
            selectrole.setAttribute('id', 'show_roles')
            selectcolorgroup.setAttribute('id', 'show_colors')
            change_role.setAttribute('onclick', `change_profile_func(this, '${peerid}')`)
            end_show_video.setAttribute('onclick', `enable_vid(this, '${peerid}')`)
            admin_mute.setAttribute('onclick', `toggle_mute_func(this, '${peerid}')`)
            chat_mute.setAttribute('onclick', `toggle_mutechat_func(this, '${peerid}')`)
            ban.setAttribute('onclick', `ban(this, '${peerid}')`)
        
            let btnrole = document.createTextNode('Change role')
            let endvideobtn = document.createTextNode('Enable video')
            let mutebtn = document.createTextNode(`Mute`)
            let bantext = document.createTextNode(`Ban`)
            let chatmute = document.createTextNode(`chat Ban`)
        
            // participants_connected[name] = {id: id, name: name, role: role, anonymous: anonymous}
            
            chat_mute.appendChild(chatmute)
            ban.appendChild(bantext)
            end_show_video.appendChild(endvideobtn)
            change_role.appendChild(btnrole)
            admin_mute.appendChild(mutebtn)

            list_div.appendChild(change_role)
            list_div.appendChild(selectrole)
            list_div.appendChild(selectcolorgroup)
            list_div.appendChild(end_show_video)    
            list_div.appendChild(admin_mute)
            list_div.appendChild(chat_mute)
            list_div.appendChild(ban)

            list_div.setAttribute('data-chatmute', false)
            list_div.setAttribute('data-enabledvid', false)
            list_div.setAttribute('data-mutevid', false)
        }

        // Adding rating to judges role if judging system includes judging
        if(this.role == 'judge' && this.roominfo.judgingSYS.includes('judges')){
            if(MAIN_IDS.role == 'speaker'){
                let text = document.createTextNode('Rate')
                let rate_btn = document.createElement('button')
                rate_btn.appendChild(text)
                let rating = document.createElement('input')
                rating.setAttribute('type', 'number')
                rating.setAttribute('min', '0')
                rating.setAttribute('max', '10')
                rating.setAttribute('id', 'given-rating')
                rating.setAttribute('value', '5')
                rate_btn.setAttribute('data-rating', '0')
                rate_btn.setAttribute('onclick', `send_rating(this, '${peerid}')`)
                list_div.appendChild(rating)
                list_div.appendChild(rate_btn)
            }
        } 

        // Adding rating to audience if judging system includes audience
        if(this.role == 'audience' && this.roominfo.judgingSYS.includes('audience')){
            if(MAIN_IDS.role == 'speaker'){
                let text = document.createTextNode('Rate')
                let rate_btn = document.createElement('button')
                let checkbox = document.createElement('input')
                checkbox.setAttribute('id', 'given-rating')
                checkbox.setAttribute('type', 'checkbox')
                // rate_btn.setAttribute('data-rating', '0')
                rate_btn.setAttribute('onclick', `send_rating(this, '${peerid}')`)
                rate_btn.appendChild(text)
                list_div.appendChild(checkbox)
                list_div.appendChild(rate_btn)

            }
        }

        
        li.setAttribute('id', `us${peerid}er`)
        li.append(list_div)
        participants_list.append(li)
    }

    newrole(peerID, role, team){
        if(this.peerid == peerID){
            ORGROLE = role
            main_ids.role = role
            this.role = role
            this.teamid = team

            if(this.role != 'admin'){


                for(let i = 0; i<document.querySelectorAll('script').length; i++){
                    if(document.querySelectorAll('script').item(i).src == 'https://localhost:3000/admin.js') document.querySelectorAll('script').item(i).remove()
                }


                // document.querySelectorAll('script')
                // .forEach((script) => {
                //     if(script.src == 'https://localhost:3000/admin.js'){
                //         script.remove()
                //     } 
                // })

                (document.querySelector('#leaveforall')) && document.querySelector('#leaveforall').remove() 
            }

            if(this.role == 'admin'){
                // <button id="leaveforall" class="leave">Leave for all</button>
                let text = document.createTextNode('Leave for all');
                let leaveforall = document.createElement('button')
                leaveforall.setAttribute('class', 'leave')
                leaveforall.setAttribute('id', 'leaveforall')
                leaveforall.append(text)
                document.querySelector('div#header').appendChild(leaveforall)
                
                let script = document.createElement('script')
                script.setAttribute('src', '../admin.js')
                document.body.appendChild(script)
            }
        }

        participants_connected[peerID].role = role
        participants_connected[peerID].teamid = team
        document.querySelectorAll('#p_list li')
        .forEach((li) => {
            li.remove()
        })
        
        document.querySelectorAll('#seleteduser option.not-none')
        .forEach((opt) => {
            opt.remove()
        })
        // if(document.querySelector('#seleteduser option')) document.querySelectorAll('#seleteduser option').remove()

        for(let obj in participants_connected){
            this.addtoparticipantlist(obj, participants_connected[obj])
        }
    }

    chatgroup(group, receiverID){
        if(chatmuted == false){
            document.querySelectorAll('#chat-space div')
            .forEach((elem) => {
                elem.remove()
            })
            messageForm.addEventListener('submit', (event) => {
                event.preventDefault();

                let message_details = {
                    name: this.name,
                    message: message.value,
                    roomID: ROOMID,
                    role: this.role,
                    teamid: this.teamid,
                    particular_person: document.querySelector(`select#seleteduser`).value
                    // group
                }
                socket.emit("sendMESSAGE", message_details); // Emit a send message event and pass chat message with userName
                addtext(chatspace, this.name, message.value, this.role)
                message.value = "";
            })

            socket.on('Addmessage', (message) => {
                if((this.role == message.role && this.teamid == message.teamid) || this.role == 'admin' || message.role == 'admin'){
                    if(message.particular_person == ""){
                        addtext(chatspace, message.name, message.message, message.role)
                    } else {
                        if(message.particular_person == this.peerid){
                            addtext(chatspace, message.name, message.message, message.role)
                        }
                    }
                }
            })
        }
    }

    defaultNotification(header, message, type, auto){
        let notifications = document.querySelector('#notifications')

        /*
        <div>
            <i>icon</i>
            <div>
                <div>
                    <h1>dfsaf</h1>
                    <p>ggdjfk</p>
                </div>
                <div>
                    <button>ok</button>
                </div>
            </div>
            <button>x</button>
        </div>
        */
        
        // Message div
        let Message_div = document.createElement('div')

        let header_text = document.createTextNode(header)
        let message_text = document.createTextNode(message)
        let headerElem = document.createElement('h3')
        let messageElem = document.createElement('p')

        headerElem.append(header_text)
        messageElem.append(message_text)

        
        Message_div.setAttribute('class', 'message_div')
        Message_div.appendChild(headerElem)
        Message_div.appendChild(messageElem)


        // button div
        let Buttons_div = document.createElement('div')
        let btn_text = document.createTextNode('ok')
        let okbtn = document.createElement('button')
        okbtn.appendChild(btn_text)
        okbtn.setAttribute('id', 'okButton') 

        Buttons_div.appendChild(okbtn)

        // 2nd main div
        let second_main = document.createElement('div')
        second_main.appendChild(Message_div)
        second_main.appendChild(Buttons_div)



        let message_icons = {
            error: "fa-duotone fa-circle-xmark",
            warn: "fa-duotone fa-triangle-exclamation",
            info: "fa-duotone fa-square-info"
        }

        // Main div
        let infoI = document.createElement('i')
        infoI.setAttribute('class', message_icons[type])
        let cancel = document.createElement('button')
        cancel
        .appendChild(document.createTextNode('x'))
        cancel.setAttribute('id', 'cancel')

        let main_div = document.createElement('div')
        main_div.appendChild(infoI)
        main_div.appendChild(second_main)
        main_div.appendChild(cancel)


        notifications.appendChild(main_div)

    }

    endpeer(){
        roomPeer.destroy()
        socket.disconnect()
        if(roomfunc.anonymous){
            window.location.replace("/anonymous"); 
            return
        } 
        window.location.replace("/");
    }

    clock(time){
        let timer = document.querySelector('#timer')
        if(!time){
            if(timer.classList.contains("disappear")){timer.classList.add("disappear")}
            return
        } 
        timer.classList.remove("disappear")

        let minutes = document.querySelector('#minutes')
        let seconds = document.querySelector('#seconds')

        let timeinsecs = (time*60) - 1
        let intervals = setInterval(() => {
            let mins = parseInt(timeinsecs / 60, 10)
            let secs = parseInt(timeinsecs % 60, 10)

            minutes.innerHTML = mins < 10 ? "0" + mins : mins;
            seconds.innerHTML = secs < 10 ? "0" + secs : secs;
            
            if(timeinsecs == 0){
                timer.style.color = "red"
                clearInterval(intervals)
            }

            timeinsecs--
        }, 1000)
    }
}



let current_vid = true
let users_peer_number;

const main_ids = {
    id: ORGID, 
    name: ORGNAME, 
    role: ORGROLE, 
    anonymous: ORGANON,
    teamid: ORGTEAMID,
    roominfo: ROOMINFO,
    initiallyhere: WASALREADYHERE
}

const socket = io('/')

// video segment
const vidspace = document.querySelector('#records')
const participants_list = document.querySelector('#p_list')

// message segment
const messageForm = document.querySelector('#messageForm')
const message = document.querySelector('#message-box')
const chatspace = document.querySelector('#chat-space')

const roomPeer = new Peer(undefined, {
    host: '/',
    port: '3000',
    path: '/room'
})

// stores all connected calls
let peersconnected = {}
// people joined
let participants_connected = {}
let participants_connected_log = {}
// room functions
let roomfunc
// stream
let Stream
// admin muting
let admin_muted = false
// chat muted
let chatmuted = false
// enabled video
let videoenabled;
(ORGROLE == 'admin') ? videoenabled = true : videoenabled = false;
// banned list
let banned = []
// ratings
let ratings = {}
// video active
let video_active = false;
//stream
let thestream;

console.log('763... WASALREADYHERE', WASALREADYHERE)
// JOIN A ROOM AND SEND A SIGNAL TO SERVER
roomPeer.on('open', async (userpeerid) => {
    users_peer_number = userpeerid;
    roomfunc = new UserRoomFuncs(userpeerid, main_ids);
    console.log(main_ids)
    roomfunc.addtoparticipantlist(userpeerid, main_ids);
    (WASALREADYHERE && videoenabled) ? await connecttoexistingpeers(true) : await roomfunc.buildconnection();   
    socket.emit('join-room', ROOMID, userpeerid, main_ids)
    roomfunc.chatgroup()
    roomfunc.defaultNotification('Connected', `you've joined room ${ROOMID} as peer ${userpeerid}`, 'info')
    
    // add your information to the participants connected list first
    participants_connected[userpeerid] = main_ids
    participants_connected_log[userpeerid] = main_ids
})




roomPeer.on('disconnected', () => {
    // roomPeer.reconnect()
    roomfunc.defaultNotification('You got disconnected', `YOU GOT COMPLETELY DISCONNETED DUE TO YOUR NETWORK ERRORS`, 'info')
    console.log('disconnected')
}) 

let timebomb;
socket.on('adminfuncs', async func =>{
    switch (func.title){
        case 'changerole':
            roomfunc.defaultNotification('Changed role', `Your role has been changed to ${func.role}`, 'info')
            roomfunc.newrole(func.peerID, func.role, func.team)
            break;
        case 'enablevid':
            if(func.peerID == users_peer_number){
                videoenabled = func.videoenabled;
                console.log('648',videoenabled);
                if(videoenabled){
                    roomfunc.defaultNotification('Video enabled', 'Admin has been enabled your video stream', 'info')
                } else {
                    roomfunc.defaultNotification('Video disabled', 'Admin has been disabled your video stream', 'info')
                    videoenabled = false //disabling ability to make video again
                    if(!video_active) return
                    EndVid()
                }

            }
            break;
        case 'endroomforall':
            timebomb = setTimeout(() => {
                roomfunc.endpeer()
                console.log(func.intentional)
            }, (func.intentional == true) ? 0 : 60000)
            roomfunc.defaultNotification('Room termination', 'Room to be destroyed if no admin is present in the next 1 min', 'info')
            roomfunc.clock(1)
            break;
        case 'revertTerminaton':
            console.log('reverted')
            roomfunc.clock()
            roomfunc.defaultNotification('Room termination reverted', 'Admin detected', 'info')
            clearTimeout(timebomb)
            break;
        case 'ban':
            if(!(func.peerID == roomfunc.peerid)) return
            roomfunc.defaultNotification("You've been banned", "Admin has banned you from the room", 'info')
            window.location.replace("/")
            break;
        case 'speakingevent':
            roomfunc.clock()
            roomfunc.defaultNotification(`Speaker ${func.event_title} is to talk for ${func.duration} minutes`, "Event", 'info')
            roomfunc.clock(func.duration)
            break;
        case 'mutechat':
            if(func.peerID == users_peer_number){
                chatmuted = !chatmuted
                console.log(chatmuted)
                if(chatmuted){
                    roomfunc.defaultNotification("Your chat has been muted", "Admin has muted your chats", 'info')
                    document.querySelector('#chatbox form').style.display = 'none'//.classList.toggle("disappear")
                    let p = document.createElement('p')
                    p.appendChild(document.createTextNode('Admin has muted your chat...'))
                    document.querySelector('#chatbox')
                    .appendChild(p)
                } else {
                    document.querySelector('#chatbox p').remove()
                    document.querySelector('#chatbox form').style.display = 'flex'//.classList.toggle("disappear")
                }
            }
            break;
    }
})

// mute buttons        
document.querySelector('#mute_aud')
.addEventListener('click', (e) => {
    Muteaud(thestream)
})

document.querySelector('#mute_vid')
.addEventListener('click', (e) => {
    Mutevid(thestream)
})

// Start video button
document.querySelector('#Start_video')
.addEventListener('click', async () => {
    console.log(`${video_active}`)

    if(video_active){
        EndVid()
        // video_active = false
        // console.log('vid disabled')
        // console.log('\n')
        // thestream.getTracks().forEach(track => {
        //     if(track.readyState == 'live') track.stop()
        //     Object.keys(peersconnected).forEach(peer => peersconnected[peer].close())
        // })
        // socket.emit('endcall', roomfunc.peerid)
        // document.querySelector(`div#us${roomfunc.peerid}er`).remove()
        return
    } 

    console.log(videoenabled)
    if (videoenabled){
        console.log('vid enabled')
        console.log('\n')
        let tempobj = {...participants_connected}
        delete tempobj[users_peer_number]   
        await roomfunc.buildconnection(tempobj, true)    
    } else {roomfunc.defaultNotification('Video is not enabled by admin', "Video streaming isn't enabled. Ask admin for permission", 'warning')}
})

document.querySelector("#leave")
.addEventListener('click', () => {
    roomfunc.endpeer()
})

socket.on('callended', (id) => {
    console.log(id)
    document.querySelector(`div#us${id}er`).remove()
})

socket.on('scheduleinterupt', () => {
    videoenabled = false
    if(video_active) EndVid()
})

async function show_profile(e, id){
    console.log(id)
    const responses = await fetch('https://localhost:3000/profile', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            checking_profile: true,
            searched_id: participants_connected[id].id
        })
    })
   
    const data = await responses.json()
    console.log(data)
}

window.addEventListener('beforeunload', function(e) {
    roomfunc.endpeer()
});







// rating speakers
let new_rating = 0
let aud_vote = -1
function send_rating(elem, id){
    let given_rating;
    let sent_rating;
    if(roomfunc.role == 'audience'){
        aud_vote = -aud_vote
    } else {
        given_rating = elem.parentElement.children['given-rating'].value
        sent_rating = given_rating - new_rating  // gives final rating depending on the initial rating
        new_rating = given_rating
    }

    if(roomfunc.role == 'audience') sent_rating = aud_vote 
    socket.emit('sent_rating', sent_rating, participants_connected[id].id)
    ratings[participants_connected[id].id] = sent_rating // saves the ratings already sent for later reference
}

// adds other people's video streams to yours
function videostream(video, stream, name, id){
    video.muted = true
    video.srcObject = stream
    let div = document.createElement('div')
    let streamname = document.createElement('p')
    let nametext = document.createTextNode(name)
    streamname.appendChild(nametext)
    div.appendChild(video)
    div.appendChild(streamname)
    // once the video is loaded, play the video automatically
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    div.setAttribute('id', `us${id}er`)
    vidspace.append(div)
}

// adds text to text group
function addtext(space, username, usermessage, k){
    let message_space = document.createElement('div')
    let message_box = document.createElement('p')
    let kp = document.createElement('p')
    let name_box = document.createElement('small')
    let message_text = document.createTextNode(`${usermessage}`)
    let kt = document.createTextNode(`${k}`)
    let person_name = document.createTextNode(`${username}`)

    name_box.appendChild(person_name)
    message_box.appendChild(message_text)
    kp.appendChild(kt)
    kp.style.display = 'none'

    message_space.appendChild(kp)
    message_space.appendChild(name_box)
    message_space.appendChild(message_box)
    space.appendChild(message_space)
}

function selectedchat(peerid, mainids){
        let optiontext = document.createTextNode(mainids.name)
        let option = document.createElement('option')
        option.setAttribute('value', peerid)
        option.setAttribute('class', 'not-none')
        option.setAttribute('id', `us${peerid}er`)
        option.appendChild(optiontext)
        document.querySelector('#seleteduser').appendChild(option)
}

function selectedspeakers(peerid, mainids){
    let optiontext = document.createTextNode(mainids.name)
    let option = document.createElement('option')
    option.setAttribute('value', peerid)
    option.setAttribute('class', 'not-none')
    option.setAttribute('id', `us${peerid}er`)
    option.appendChild(optiontext)
    document.querySelector('#select_speaker').appendChild(option)
}

function Mutevid(streamentered){
    if(admin_muted){
        return
    }

    const enabled = streamentered.getVideoTracks()[0].enabled;
    if(enabled){
        streamentered.getVideoTracks()[0].enabled = false;
    } else {
        streamentered.getVideoTracks()[0].enabled = true;
    }
}

function Muteaud(streamentered){
    if(admin_muted){
        return
    }

    const enabled = streamentered.getAudioTracks()[0].enabled;
    if(enabled){
        streamentered.getAudioTracks()[0].enabled = false;
    } else {
        streamentered.getAudioTracks()[0].enabled = true;
    }
}

function EndVid(){
    video_active = false
        console.log('vid disabled')
        console.log('\n')
        thestream.getTracks().forEach(track => {
            if(track.readyState == 'live') track.stop()
            Object.keys(peersconnected).forEach(peer => peersconnected[peer].close())
        })
        socket.emit('endcall', roomfunc.peerid)
        document.querySelector(`div#us${roomfunc.peerid}er`).remove()
        return
}

async function connecttoexistingpeers(admin){
    participants_connected = WASALREADYHERE 
    console.log("782... WASALREADYHERE", WASALREADYHERE)
    let tempobj = {...participants_connected}
    delete tempobj[await roomfunc.peerid]  
    await roomfunc.buildconnection(tempobj)
    for(let i in tempobj){
        roomfunc.addtoparticipantlist(i, tempobj[i])
    }
    // (admin) && socket.emit()
}