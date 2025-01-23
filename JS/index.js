import { createContact } from './createContact.js';



const signInUpButton=document.querySelector('#signInUpButton');
const closeButton1=document.querySelector('#closeButton1');
signInUpButton.addEventListener('click',()=>{
    console.log('Button Clicked');
    document.querySelector('#overlay').style.display='block';
});

closeButton1.addEventListener('click',()=>{
    document.querySelector('#overlay').style.display='none';

});


const switchButton=document.querySelector('#switchButton');
const signInCont=document.querySelector('.SignIn');
const signUpCont=document.querySelector('.SignUp');


// Event Listener for Switch Button
switchButton.addEventListener('change',()=>{
    console.log('Switch Button Clicked');
    
    // display based on checked or not
    if(switchButton.checked){
        signInCont.style.display='none';
        signUpCont.style.display='flex';
    }
    else{
        signInCont.style.display='flex';
        signUpCont.style.display='none';
    }

});








const addContactButton= document.querySelector('#addContactButton');
const closeButton2=document.querySelector('#closeButton2');
addContactButton.addEventListener('click',()=>{
    console.log('Add Contact Button Clicked');
    document.querySelector('#overlay2').style.display='block';
});

closeButton2.addEventListener('click',()=>{
    document.querySelector('#overlay2').style.display='none';
});



const addSubmitButton=document.querySelector('#addSubmitButton');

addSubmitButton.addEventListener('click',(event)=>{
    event.preventDefault();

    createContact('John','Doe','123-456-7890','email');

    // issue with FormData object
    
    // var formData = new FormData(document.querySelector('#addContactForm'));
    
    // createContact(formData.get('firstName'),formData.get('lastName'),formData.get('phone'),formData.get('email'));
    //add code here to send to API endpoints
});










