let isOn=false;
const showMenu=()=>{
    const div=document.querySelectorAll(".mobile-menu");
isOn?div[0].style.display="none": div[0].style.display="flex";
isOn=!isOn;
}
document.getElementById("showMenu").addEventListener('click', showMenu);

let isUserProfileOn=false;
const showUserProfile=()=>{
    const div=document.querySelectorAll(".user-profile");
    isUserProfileOn?div[0].style.display="none": div[0].style.display="block";
isUserProfileOn=!isUserProfileOn;
}
document.getElementById("userDiv").addEventListener('click', showUserProfile);

///////////////////////////////////

const isAdminLogedIn=()=>{
    const loginedUser = JSON.parse(localStorage.getItem("loginedUser")) || [];
    if (loginedUser.role != "admin") {
      location.href='../login.html'
    }
}
isAdminLogedIn()

const logout = () => {
    localStorage.removeItem("loginedUser");
    location.href='../index.html'
  };

document.getElementById("logoutBtn").addEventListener('click',logout)



