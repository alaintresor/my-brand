let isOn=false;
const showMenu=()=>{
    const div=document.querySelectorAll(".mobile-menu");
    
if(isOn){
div[0].style.display="none";
myNav.classList.remove("nav-colored");
myNav.classList.add("nav-transparent")
}else{
 div[0].style.display="flex"
myNav.classList.add("nav-colored");
myNav.classList.remove("nav-transparent")
}
isOn=!isOn;
}
document.getElementById("showMenu").addEventListener('click', showMenu);

const switchContent=id=>{
    const about=document.getElementById("aboutBtn");
    const aboutContent=document.querySelector(".show-about");
    const skills=document.getElementById("skillsBtn");
    const skillsContent=document.querySelector(".show-skills");
    const experience=document.getElementById("experience");
    if(id=="aboutBtn")
    {
        skillsContent.style.display="none";
        skills.className="";
        
        // experience.style.display="none";
        // experience.className="";

        aboutContent.style.display="block";
        about.className="active";
    }
    if(id=="skillsBtn")
    {
        aboutContent.style.display="none";
        about.className="";

        skillsContent.style.display="block";
        skills.className="active";
        
        // experience.style.display="none";
        // experience.className="";

    }
}

var myNav = document.getElementById('mynav');
window.onscroll = function () { 
    "use strict";
    if (window.scrollY > 10 ) {
        myNav.classList.add("nav-colored");
        myNav.classList.remove("nav-transparent");
    } 
    else {
        myNav.classList.add("nav-transparent");
        myNav.classList.remove("nav-colored");
    }
};