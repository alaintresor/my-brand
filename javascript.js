let isOn=false;
const showMenu=()=>{
    const div=document.querySelectorAll(".mobile-menu");
isOn?div[0].style.display="none": div[0].style.display="flex";
isOn=!isOn;
}
document.getElementById("showMenu").addEventListener('click', showMenu);
