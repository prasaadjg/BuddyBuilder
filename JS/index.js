const signInUpButton=document.querySelector('#signInUpButton');

signInUpButton.addEventListener('click',()=>{
    console.log('Button Clicked');
    document.querySelector('#overlay').style.display='block';
});




const switchButton=document.querySelector('#switchButton');
const signInCont=document.querySelector('.SignIn');
const signUpCont=document.querySelector('.Login');


// Event Listener for Switch Button
switchButton.addEventListener('change',()=>{
    console.log('Switch Button Clicked');
    
    // display based on checked or not
    if(switchButton.checked){
        signInCont.style.display='none';
        signUpCont.style.display='block';
    }
    else{
        signInCont.style.display='block';
        signUpCont.style.display='none';
    }

});


const addContactButton= document.querySelector('#addContactButton');

addContactButton.addEventListener('click',()=>{
    console.log('Add Contact Button Clicked');
    document.querySelector('#overlay2').style.display='block';
});










