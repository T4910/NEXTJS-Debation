async function change_profile_func(elem, id){  
    if(participants_connected[id] == undefined){
        console.warn("user doesn't exist")
        return
    }

    let new_selected_role = document.querySelector(`li#us${id}er select#show_roles`).value
    let team;

    if (new_selected_role == 'speaker'){
        team = document.querySelector(`li#us${id}er select#show_colors`).value
        console.log(team)
    }

    socket.emit('adminpower', 
        {
            title: 'changerole', 
            peerID: id,
            role: new_selected_role,
            team: team
        },
        {
            roomID: ROOMID,
            person_id: participants_connected[id].id,
            call_id: id,
            new_role: new_selected_role,
            new_team: team
        }
     )
     roomfunc.newrole(id, new_selected_role, team)
}

// let vidable = false
function enable_vid(elem, id){
    let vidable = (elem.parentElement.dataset['enabledvid'] == 'false')
    elem.parentElement.dataset['enabledvid'] = (elem.parentElement.dataset['enabledvid'] == 'false')


    socket.emit('adminpower', 
        {
            title: 'enablevid', 
            peerID: id,
            videoenabled: vidable
        },
        {
            roomID: ROOMID,
            person_id: participants_connected[id].id,
            call_id: id,
        }
     )
}


function toggle_mute_func(elem, id){
    let vidmute = (elem.parentElement.dataset['mutevid'] == 'false')
    elem.parentElement.dataset['mutevid'] = (elem.parentElement.dataset['mutevid'] == 'false')

    socket.emit('toggle_mute', id, vidmute)
}

// let chatmute = false
function toggle_mutechat_func(elem, id){
    let chatmute = (elem.parentElement.dataset['chatmute'] == 'false')
    elem.parentElement.dataset['chatmute'] = (elem.parentElement.dataset['chatmute'] == 'false')

    console.log(chatmute, elem.parentElement.dataset['chatmute'] )
    socket.emit('adminpower',
        {
            title: 'mutechat',
            peerID: id,
            toggle: chatmute
        }
    )
}

function ban(element, id){
    // if(banned.includes(participants_connected[id])){
    //     unban(id)
    //     return
    // }
    banned.push(participants_connected[id])
    socket.emit('adminpower', 
        {
            title: 'ban', 
            peerID: id,
        },
        {
            roomID: ROOMID,
            person_id: participants_connected[id].id,
            call_id: id,
        }
     )
}

function unban(person){
    const new_banned_list = banned.filter((people) => people != participants_connected[person])
    banned = new_banned_list
    socket.emit('adminpower', 
        {
            title: 'unban'
        },
        {
            roomID: ROOMID,
            person_id: participants_connected[person].id,
            call_id: person,
        }
     )
}

document.querySelector("#leaveforall")
.addEventListener('click', () => {
    socket.emit('adminpower', {title: 'endroomforall', intentional: true})
    socket.on('cleared', () => {
        console.log('cleared')
        roomfunc.endpeer()
    })
})


let scheduling = {
    start: 0,
    active: false
}
let schedule_list = {}
let serial = 0
function set_speakers_scheduling(){
    const speaker_id = document.querySelector('#select_speaker').value
    const time = document.querySelector('#tile_minutes').value
    const IDs = participants_connected[speaker_id]

    let div = document.createElement('div')
    div.setAttribute('id', 'speakers')
    div.setAttribute('class', 'tiles')

    let p_speak_text = document.createTextNode((IDs) ? IDs.name : 'break')
    let span_text = document.createTextNode(time)
    let p_time_text = document.createTextNode('min')
    let btn_text = document.createTextNode('cancel')

    let p_speak = document.createElement('p')
    let p_time = document.createElement('p')
    let span = document.createElement('span')
    let btn_cancel = document.createElement('button')
    btn_cancel.setAttribute('onclick', 'cancel_tile(this)')

    // p_time.setAttribute('id', 'dddd')

    p_speak.appendChild(p_speak_text)
    span.appendChild(span_text)
    p_time.appendChild(span)
    p_time.appendChild(p_time_text)
    btn_cancel.appendChild(btn_text)

    div.setAttribute('data-serial', serial)
    
    div.appendChild(p_speak)
    div.appendChild(p_time)
    div.appendChild(btn_cancel)

    div.style.backgroundColor = (IDs) ? IDs.teamid : 'beige'
    let schedule = document.querySelector("#schedule")
    schedule.appendChild(div)
    schedule_list[serial] = {
        prev: (schedule_list[serial-1] == undefined) ? -1 : serial-1,
        next: -1,
        title: (IDs) ? speaker_id : `break`,
        duration: Number(time)
    }
    // reset in previous node next attribute to new node being created
    if(schedule_list[schedule_list[serial].prev] !== undefined){
        schedule_list[schedule_list[serial].prev].next = serial 
    }

    // console.log(schedule_list[serial].prev, `...${serial}...` ,schedule_list[serial].next)
    serial++
}

function cancel_tile(e){
    e.parentElement.remove() // deleting UI element for scheduling list

    // linked list delete
    let prev_node = schedule_list[e.parentElement.dataset.serial].prev 
    let next_node = schedule_list[e.parentElement.dataset.serial].next 

    if(schedule_list[prev_node] == undefined || schedule_list[next_node] == undefined){
        
        // schedule_list[prev_node] == undefined
        if(schedule_list[next_node] !== undefined){
            schedule_list[next_node].prev = -1
            scheduling['start'] = next_node;
        }

        // schedule_list[next_node] == undefined
        if(schedule_list[prev_node] !== undefined){
            schedule_list[prev_node].next = -1
            serial = prev_node + 1
        }

        delete schedule_list[e.parentElement.dataset.serial]
        return
    }

    schedule_list[prev_node].next = next_node
    schedule_list[next_node].prev = prev_node
    delete schedule_list[e.parentElement.dataset.serial]
}

let timeoutvar;
function stop_schedule(){
    console.log('schedule stopped')
    document.querySelector('button#Start_video')
    .removeEventListener('click', stop_schedule)
    clearTimeout(timeoutvar)
    socket.emit('scheduleinterupted')
}

const d = new Date();
function save_scheduling_list(){
    scheduling['commence'] = Date.now();
    scheduling['active'] = true;
    scheduling['schedule'] = schedule_list
    scheduling['edit'] = {editted: false, newPoint: ''}
    setTimeout(() => {
        if(video_active) EndVid()
        document.querySelector('button#Start_video')
        .addEventListener('click', stop_schedule)
        start_speakers(scheduling.start)
    }, 2)
}

// RECURSION!!!
function start_speakers(pointer){
    let process_pointer = scheduling['schedule'][pointer];
    console.log('222', process_pointer); // selected event to run 
    if(process_pointer == undefined){
        document.querySelector('button#Start_video')
        .removeEventListener('click', stop_schedule)
        scheduling.active = false
        return
    }
    
    // send notification to everyone about who is speaking or a break
    socket.emit('adminpower', {title: 'speakingevent', event_title: process_pointer.title, duration: process_pointer.duration});
    roomfunc.defaultNotification(`Speaker ${process_pointer.title} is to talk for ${process_pointer.duration} minutes`, "Event", 'info');
    
    // if the event has a speaker in it, enable the person's video
    let personelement = document.querySelector(`li#us${process_pointer.title}er>div>select#show_colors`)
    if(process_pointer.title != 'break'){enable_vid(personelement, process_pointer.title)}
    
    // wait for the certain duration then excute the code below the ends the speakers video and abling 
    // access and start the function again except this time, send the a process_pointer different process_pointer in the

    timeoutvar = setTimeout(() => {
    if(process_pointer.title != 'break'){enable_vid(personelement, process_pointer.title);}
        start_speakers(process_pointer.next)
    }, process_pointer.duration*60000)
}

// socket.on('participants_connected', async list =>{
//      console.log('seen')
//     participants_connected = list 
//     console.log(list)
//     let tempobj = {...participants_connected}
//     delete tempobj[roomfunc.peerid]  
//     await roomfunc.buildconnection(tempobj)
//     for(let i in list){
//         roomfunc.addtoparticipantlist(i, list.i)
//     }
// })

// sends a message to the server that the admin is fully connected to the room
// and particpants_connected can be executed
