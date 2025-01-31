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
    fetch('LAMPAPI/AddContact.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    
    })
    createContact(formData.FirstName,formData.LastName,formData.Phone,formData.Email);

    if(displayFlag){
        displayGrid();
    }
    else{
        displayList();
    }

    document.querySelector('#overlay2').style.display='none';
    
});


// -------------------------DELETE CONTACT-------------------------

// Replace existing delete contact code with:

let containerType='#buddyGrid';
let displayType='#contactGrid';
document.querySelector(containerType).addEventListener('click', function(event) {
    if (event.target.id === 'deleteButton') {
        const button = event.target;
        const contactCard = button.closest(displayType);
        
        if (contactCard) {
            // Check if button is already in confirmation state
            if (button.dataset.confirming === 'true') {
                // Second click - delete the contact
                try {
                    fetch('LAMPAPI/DeleteContact.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: contactCard.dataset.id
                        })
                    });
                    contactCard.remove();
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            } else {
                // First click - enter confirmation state
                button.dataset.confirming = 'true';
                button.textContent = 'Click Again to Confirm';
                button.style.backgroundColor = 'var(--accent-error)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    button.dataset.confirming = 'false';
                    button.textContent = 'Delete';
                    button.style.backgroundColor = '';
                }, 3000);
            }
        }
    }
});


// -------------------------EDIT CONTACT-------------------------
const overlay3=document.querySelector('#overlay3');
document.querySelector(containerType).addEventListener('click', function(event) {
    if(event.target.id==='editButton'){
        const button=event.target;
        const contactCard=button.closest(displayType);

        if(contactCard){
            
            const name= contactCard.querySelector('#contactName').textContent.split(' ');
            const firstName=name[0];
            const lastName=name[1];
            const phone=contactCard.querySelector('#contactPhone').textContent;
            const email=contactCard.querySelector('#contactEmail').textContent;

            const editContact=document.querySelector('#editContactForm');
            editContact.querySelector('input[name="firstName"]').value=firstName;
            editContact.querySelector('input[name="lastName"]').value=lastName;
            editContact.querySelector('input[name="phone"]').value=phone;
            editContact.querySelector('input[name="email"]').value=email;

            overlay3.style.display='block';
        }

    }

});

const closeButton3=document.querySelector('#closeButton3');
closeButton3.addEventListener('click',()=>{
    overlay3.style.display='none';
});
// -------------------------DISPLAY SWITCH-------------------------
const gridButton=document.querySelector('#gridButton');
const listButton=document.querySelector('#listButton');

gridButton.addEventListener('click',()=>{
    displayGrid();
    displayFlag=true;
    containerType='#buddyGrid';
    displayType='#contactGrid';
});

listButton.addEventListener('click',()=>{
    displayList();
    displayFlag=false;
    containerType='#buddyList';
    displayType='#contactList';
});
