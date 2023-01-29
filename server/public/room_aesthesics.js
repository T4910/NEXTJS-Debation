// Styling resizing
var s = document.createElement("style");
    
document.body.append(s);
window.onresize = function() {
  s.innerHTML = ":root{--win-width:" + window.innerWidth + "px;--win-height:" + window.innerHeight + "px}";
}
s.innerHTML = ":root{--win-width:" + window.innerWidth + "px;--win-height:" + window.innerHeight + "px}";


// NOTIFICATION SLIDER
const notholder = document.querySelector(".notificationholder");
['click','scroll', 'wheel'].forEach((event) => {
    notholder.addEventListener(event, (e) => {
        if(e.target.classList.value == "notificationholder") {
            notholder.classList.add("disappear")
        }   
    })
})

// NOTIFICATION BUTTON
document.querySelector('.shownotification')
.addEventListener('click', () => {
    notholder.classList.remove("disappear")
})

// paricipants
const par = document.querySelector('.participants')
document.querySelector('#people')
.addEventListener('click', () => {
    par.classList.toggle("disappear")
})