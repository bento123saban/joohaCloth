//variabel Global
const root = document.querySelector(":root")
const winHeight = window.innerHeight
const winWidth = window.innerWidth;
const tabButton = document.getElementById("tabsButton")
const sections = document.querySelectorAll("section")
const navA = document.querySelectorAll("#nav-menu .nav-list a")

// functions
function navClose() {
    document.getElementById("check").checked = false
}

function navIndic() {
let current = ""
sections.forEach( (section) => {
    if (section.getBoundingClientRect().top <= (winHeight * 0.4)) {
        current = section.getAttribute("id");
    }
});
navA.forEach((a) => {
    a.classList.remove("active")
    if (a.classList.contains(current)) {
        a.classList.add("active");
    }
});
}
window.onscroll = function(){
    navIndic()
}
