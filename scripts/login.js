const toRegBtn = document.getElementById("login_toRegBtn");
const toLoginBtn = document.getElementById("register_toLoginBtn");
const register_DataDiv = document.getElementById("register_DataDiv");
const login_DataDiv = document.getElementById("login_DataDiv");

toRegBtn.onclick = function(){
    login_DataDiv.style.display = "none";
    register_DataDiv.style.display = "flex";
};

toLoginBtn.onclick = function(){
    register_DataDiv.style.display = "none";
    login_DataDiv.style.display = "flex";
}