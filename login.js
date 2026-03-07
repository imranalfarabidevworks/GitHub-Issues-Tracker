console.log('hello Github');
// ---------------login btn--------------//
document.getElementById("login-btn")
.addEventListener("click" , function(){
//console.log("clicked me");
// 1. get the user name input//
const userInput=document.getElementById("userName-input");
const userName=userInput.value;
console.log(userName);
//.2 get the user pin input//
const pinInput=document.getElementById("pin-input");
const pin=pinInput.value;
console.log(pin)
//.3 match username and pin //
if(userName =="admin" && pin =="admin123"){
//----alart succes-------//
alert("login Succes")
window.location.assign("./home.html")
}
// return faild
else{
    alert("Login Faild");
    return;
}
})