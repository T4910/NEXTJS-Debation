// window.onload = () => {
    var s = document.createElement("style");
    
    document.body.append(s);
    window.onresize = function() {
      s.innerHTML = ":root{--win-width:" + window.innerWidth + "px;--win-height:" + window.innerHeight + "px}";
    }
    s.innerHTML = ":root{--win-width:" + window.innerWidth + "px;--win-height:" + window.innerHeight + "px}";

let form = document.querySelector("#fillprf")
let menu = document.querySelector("#companystuff")
let photo_dp = document.querySelector(".showpicdisplay")
let configmenu = document.querySelector("#configmenu")
let sendmail = document.querySelector(".email-input")
let preview_save_btn = document.querySelector("#savepreviewedimg")


// image in preveiw popup
let imagePreview = document.querySelector("#previewer")

try{
    document.querySelectorAll('#edit')
    .forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(form.style.display);
            (form.style.display == "none") ? form.style.display = "block" : form.style.display = "none"
        })
    })
} catch(err) {
    console.log('not ava')
}

try{
    document.querySelector("#menu")
.addEventListener('click', () => {
    (menu.style.display == "none") ? menu.style.display = "block" : menu.style.display = "none"
})
} catch(err) {
    console.log('not ava')
}

try{

document.querySelector("#profile_image")
.addEventListener('click', () => {
    previewpicfunc()
})
} catch (err){
    console.log('not ava')
}

try{
document.querySelector("#invite-btn")
.addEventListener('click', (e) => {
    e.preventDefault();
    (sendmail.style.display == "none") ? sendmail.style.display = "flex" : sendmail.style.display = "none"
})
} catch (err){
    console.log('not ava')
}


function previewpicfunc(){
    // change pop up preview of supposed uploaded dp back to the default way or
    //  style if user changes mind of changingit
    function changepreviewtodefault(){
        photo_dp.style.display = "none"
        preview_save_btn.style.display = "none";
        document.querySelector('.input-img').style.display = "initial"
        imagePreview.src = imageroute
    }

    photo_dp.addEventListener('click', function remove(){
        console.log('clicked away')
        changepreviewtodefault()
        photo_dp.removeEventListener('click', remove)  
    })

    let listofevents = ['scroll','wheel']
    listofevents.forEach( evt => {
        document.body.addEventListener(evt, function remove(){
            console.log('clicked away by body')
            document.body.removeEventListener(evt, remove)  
            changepreviewtodefault()          
        })
    }) 
    
    console.log('tapped')
    photo_dp.style.display = "block";
}

try{
document.querySelectorAll("#toggleconfigurations")
.forEach(btn => {
    btn.addEventListener('click', () => {
        configmenu.classList.toggle("btn-non")
        // (configmenu.style.display == "none") ? configmenu.style.display = "block" : configmenu.style.display = "none"
        sendmail.style.display = "none";
    })
})
} catch(err) {
    console.log('not ava')
}



async function configure(){
    const responses = await fetch('http://localhost:3000/config', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            public: true
        })
    })
   
    const data = await responses.json()
    console.log(data)
}


// Image preloader:
let imgForm = document.querySelector("#image")
try{
imgForm.addEventListener("change", (e) => {
    const imgDetails = document.querySelector("input[type=file]").files[0];
    if (imgDetails) {
        previewImage(imgDetails);
        document.querySelector(".input-img").style.display = "none" // removes the change btn
        preview_save_btn.style.display = "initial"; // shows the save btn
        previewpicfunc()
    } else {
        imagePreview.src = ""
        console.error("Please select a picture");
        info.style.display = "none";
    }

})
} catch(err){
    console.log('not ava')
}

function previewImage(imgD) {
    const reader = new FileReader();

    // PREVIEW
    reader.addEventListener("load", function () {
        imagePreview.src = reader.result;
    })

    // CHECK IF THERE IS SELECTION 
    if (imgD) {
        // CHECK IF THE FILE IS AN IMAGE
        if (imgD.type === "image/jpeg" || imgD.type == "image/jpg" || imgD.type == "image/gif" || imgD.type == "image/png") {

            // CONVERTS FILE TO BASE 64
            reader.readAsDataURL(imgD);
        } else {
            imagePreview.src = "";
        }
    }
    // IF NO IMAGE
    else {
        imagePreview.src = ""
    }
}

async function joinroom(elem, id){
    console.log(elem.parentNode)
    console.log(elem.id)
    elem.parentNode.submit()

}

// }