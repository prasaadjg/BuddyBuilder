import { createContact } from "./createContact.js";
import { displayGrid, displayList } from "./displaySwitch.js";




// -------------------------SIGN IN/UP-------------------------
const signInUpButton=document.querySelector('#signInUpButton');
const closeButton1=document.querySelector('#closeButton1');

// Event Listener for Sign In/Up Button
signInUpButton.addEventListener('click',()=>{
    console.log('Button Clicked');
    document.querySelector('#overlay').style.display='block';
});

// Event Listener for Close Button
closeButton1.addEventListener('click',()=>{
    document.querySelector('#overlay').style.display='none';

});


const displayLogin= document.querySelector('#signInButton');
const displayRegister= document.querySelector('#signUpButton');
const slider=document.querySelector('#displaySlider2');
const signInCont=document.querySelector('.SignIn');
const signUpCont=document.querySelector('.SignUp');


// Event Listener for Switch Button

displayLogin.addEventListener('click',()=>{
    console.log('Login Clicked');
    signUpCont.style.display='none';
    signInCont.style.display='flex';
    slider.style.left='0px';
});

displayRegister.addEventListener('click',()=>{
    console.log('Register Clicked');
    signInCont.style.display='none';
    signUpCont.style.display='flex';
    slider.style.left='130px';
});

// SIGN UP EVENT LISTENER
const signUp=document.querySelector('#signUp');
signUp.addEventListener('submit',function(event){
    event.preventDefault();
    console.log('Sign Up Form Submitted');
    
    const formData= 
    {
        FirstName:signUp.querySelector('input[name="firstName"]').value,
        LastName:signUp.querySelector('input[name="lastName"]').value,
        Login:signUp.querySelector('input[name="username"]').value,
        Password:signUp.querySelector('input[name="password"]').value
    }

    fetch('LAMPAPI/register.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })

    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            console.log('User Registered');
            document.querySelector('#overlay').style.display='none';
            document.querySelector('.titlePage').style.display='none';
            document.querySelector('.body').style.display='flex';
            document.querySelector('#signInUpButton').style.display='none';
        }
    })
});


// SIGN IN EVENT LISTENER
const signIn=document.querySelector('#signIn');
signIn.addEventListener('submit',function(event){
    event.preventDefault();
    console.log('Sign In Form Submitted');
    
    const formData=
    {
        login:signIn.querySelector('input[name="username"]').value,
        password:signIn.querySelector('input[name="password"]').value
    }

    fetch('LAMPAPI/Login.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })

    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        if(data.error){
            console.log(data.error);
        }
        else{
            console.log('User Logged In');
            document.querySelector('#overlay').style.display='none';
            signIn.querySelector('input[name="username"]').value='';
            signIn.querySelector('input[name="password"]').value='';
            document.querySelector('.titlePage').style.display='none';
            document.querySelector('.body').style.display='flex';
            document.querySelector('#signInUpButton').style.display='none';
        }
    })
});
// -------------------------ADD CONTACT----------------------------
const addContactButton= document.querySelector('#addContactButton');
const closeButton2=document.querySelector('#closeButton2');
addContactButton.addEventListener('click',()=>{
    console.log('Add Contact Button Clicked');
    document.querySelector('#overlay2').style.display='block';
});

closeButton2.addEventListener('click',()=>{
    document.querySelector('#overlay2').style.display='none';
});



const addContact= document.querySelector('#addContactForm');
let displayFlag=true;
addContact.addEventListener('submit',function(event){
    event.preventDefault();


    const formData= 
    {
        FirstName:addContact.querySelector('input[name="firstName"]').value,
        LastName:addContact.querySelector('input[name="lastName"]').value,
        Email:addContact.querySelector('input[name="email"]').value,
        Phone:addContact.querySelector('input[name="phone"]').value
    }

    createContact(formData.FirstName,formData.LastName,formData.Phone,formData.Email);

    if(displayFlag){
        displayGrid();
    }
    else{
        displayList();
    }

    document.querySelector('#overlay2').style.display='none';
    
});

// -------------------------DISPLAY SWITCH-------------------------
const gridButton=document.querySelector('#gridButton');
const listButton=document.querySelector('#listButton');

gridButton.addEventListener('click',()=>{
    displayGrid();
    displayFlag=true;
});

listButton.addEventListener('click',()=>{
    displayList();
    displayFlag=false;
});
