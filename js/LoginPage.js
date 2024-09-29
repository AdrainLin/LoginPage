const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector("button[type='submit']");
const errorText = document.querySelector(".error-text span");

emailInput.addEventListener('blur', handleBlur);
passwordInput.addEventListener('blur', handleBlur);
emailInput.addEventListener('keyup',removeSpaces);
passwordInput.addEventListener('keyup',removeSpaces);
loginBtn.addEventListener('click',handleLoginBtnClick);

//輸入框失去焦點時判斷格式
function handleBlur(e) {
    const input = e.target;
    const label = input.nextElementSibling;
    const relatedElement = e.relatedTarget;
    
    if(input.value != ''){
        label.classList.add('active');
        if(input.id == 'email' && relatedElement.id != 'login-btn') verifyEmail(e);  
        if(input.id == 'password' && relatedElement.id != 'login-btn') verifyPassword(e);
    }else {
        label.classList.remove('active');     
    }
}
//去除所有輸入框中的空白
function removeSpaces(e) {
    let inputElement = e.target;
    let newValue = inputElement.value.replace(/\s+/g, '');
   
    inputElement.value = newValue;
}
//當email無效即時顯示提示訊息
function verifyEmail(e) {
    let verifyState = true;
    let pattren = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if(!pattren.test(emailInput.value)){
        errorText.innerText = "Invalid email";
        verifyState = false;
    }else{
        errorText.innerText = "";
    }
    return verifyState;
}
//當password無效即時顯示提示訊息
function verifyPassword(e) {
    let verifyState = true;
    let pattren = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/;
    
    if(!pattren.test(passwordInput.value)){
        errorText.innerText = "Invalid password";
        verifyState = false;
    }else {
        errorText.innerText = "";
    }
    return verifyState;
}

//點擊登入後驗證輸入是否空白、有效性
function handleLoginBtnClick(e) {
    let emailState =  verifyEmail(e);
    let passwordState = verifyPassword(e);
    let errorMessage = ''; 

    if(emailInput.value == ''){
        errorMessage = "Email is blank";
    }else if(passwordInput.value == ''){
        errorMessage = "Password is blank";
    }else if(!emailState){
        errorMessage = "Invalid email";
    }else if(!passwordState){
        errorMessage = "Invalid password";
    }
    if(errorMessage){
        e.preventDefault();
        errorText.innerText = errorMessage;
        errorText.classList.remove("shake-animate");
        setTimeout(()=>{
            errorText.classList.add("shake-animate");
        },50);
    }else {
        alert("welcome back");
    }
}