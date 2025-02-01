import { createContact } from "./createContact.js";
import { displayGrid, displayList } from "./displaySwitch.js";
import { validateSignUp } from "./validateForm.js";

let userID=0;


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

    if(!validateSignUp()){
        return;
    }
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



            // Should I auto log in the user?
            // document.querySelector('#overlay').style.display='none';
            // document.querySelector('.titlePage').style.display='none';
            // document.querySelector('.body').style.display='flex';
            // document.querySelector('#signInUpButton').style.display='none';
        }
    })
});

const firstNameInput=document.querySelector('#firstName');
const lastNameInput=document.querySelector('#lastName');

firstNameInput.addEventListener('focus', () => {
    if(firstNameInput.value.length>0)
    {
        firstNameInput.style.border='2px solid var(--accent-highlight)';
    }
    else
    {
        firstNameInput.style.border='2px solid var(--accent-error)';
    }
});

lastNameInput.addEventListener('focus', () => {
    if(lastNameInput.value.length>0)
    {
        lastNameInput.style.border='2px solid var(--accent-highlight)';
    }
    else
    {
        lastNameInput.style.border='2px solid var(--accent-error)';
    }
});
const usernameInput=document.querySelector('#username');
const passwordInput=document.querySelector('#password');
const signUpReqUser=document.querySelector('#signUpReqUser');
const signUpReqPass=document.querySelector('#signUpReqPass');

usernameInput.addEventListener('focus', () => {
    signUpReqUser.classList.add('active');
    signUpReqPass.classList.remove('active');
    
    // Get requirement elements
    const lengthReq = signUpReqUser.querySelector('.requirement:nth-child(1)');
    const charReq = signUpReqUser.querySelector('.requirement:nth-child(2)');
    
    // Validate input on focus
    const validateUsername = () => {
        const value = usernameInput.value;
        
        // Check length (3-20 chars)
        if (value.length >= 3 && value.length <= 20) {
            lengthReq.classList.add('valid');
            lengthReq.classList.remove('invalid');
            lengthReq.querySelector('#correctIcon').style.display='block';
            lengthReq.querySelector('#wrongIcon').style.display='none';

        } else {
            lengthReq.classList.add('invalid');
            lengthReq.classList.remove('valid');
            lengthReq.querySelector('#correctIcon').style.display='none';
            lengthReq.querySelector('#wrongIcon').style.display='block';
        }
        
        // Check alphanumeric only
        if (/^[a-zA-Z0-9]+$/.test(value)) {
            charReq.classList.add('valid');
            charReq.classList.remove('invalid');
            charReq.querySelector('#correctIcon').style.display='block';
            charReq.querySelector('#wrongIcon').style.display='none';
        } else {
            charReq.classList.add('invalid');
            charReq.classList.remove('valid');
            charReq.querySelector('#correctIcon').style.display='none';
            charReq.querySelector('#wrongIcon').style.display='block';
        }

        if(lengthReq.classList.contains('valid') && charReq.classList.contains('valid'))
        {
            usernameInput.style.border='2px solid var(--accent-highlight)';
        }
        else
        {
            usernameInput.style.border='2px solid var(--accent-error)';
        }
    };
    
    validateUsername();
    usernameInput.addEventListener('input', validateUsername);
});

usernameInput.addEventListener('blur', (event) => {
    if (event.relatedTarget !== passwordInput) {
        signUpReqUser.classList.remove('active');
    }
});

passwordInput.addEventListener('focus', () => {
    signUpReqUser.classList.remove('active');
    signUpReqPass.classList.add('active');
    
    // Get requirement elements
    const lengthReq = signUpReqPass.querySelector('.requirement:nth-child(1)');
    const specialCharReq = signUpReqPass.querySelector('.requirement:nth-child(2)');
    // Validate input on focus
    const validatePassword = () => {
        const value = passwordInput.value;
        
        // Check length (8+ chars)
        if (value.length >= 8) {
            lengthReq.classList.add('valid');
            lengthReq.classList.remove('invalid');
            lengthReq.querySelector('#correctIcon').style.display='block';
            lengthReq.querySelector('#wrongIcon').style.display='none';
        } else {
            lengthReq.classList.add('invalid');
            lengthReq.classList.remove('valid');
            lengthReq.querySelector('#correctIcon').style.display='none';
            lengthReq.querySelector('#wrongIcon').style.display='block';
        }
        
        // Check for special char/number
        if (/(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])/.test(value)) {
            specialCharReq.classList.add('valid');
            specialCharReq.classList.remove('invalid');
            specialCharReq.querySelector('#correctIcon').style.display='block';
            specialCharReq.querySelector('#wrongIcon').style.display='none';
        } else {
            specialCharReq.classList.add('invalid');
            specialCharReq.classList.remove('valid');
            specialCharReq.querySelector('#correctIcon').style.display='none';
            specialCharReq.querySelector('#wrongIcon').style.display='block';
        }

        if(lengthReq.classList.contains('valid') && specialCharReq.classList.contains('valid'))
        {
            passwordInput.style.border='2px solid var(--accent-highlight)';
        }
        else
        {
            passwordInput.style.border='2px solid var(--accent-error)';
        }
    };
    
    validatePassword();
    passwordInput.addEventListener('input', validatePassword);
});

passwordInput.addEventListener('blur', (event) => {
    if (event.relatedTarget !== usernameInput) {
        signUpReqPass.classList.remove('active');
    }
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
            userID=data.id;
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
        firstName:addContact.querySelector('input[name="firstName"]').value,
        lastName:addContact.querySelector('input[name="lastName"]').value,
        phone:addContact.querySelector('input[name="phone"]').value,
        email:addContact.querySelector('input[name="email"]').value,
        userID: userID
    }
    fetch('LAMPAPI/AddContact.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Success Adding:",data);
        createContact(formData.firstName,formData.lastName,formData.phone,formData.email);
    });
    

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

const editContact=document.querySelector('#editContactForm');

editContact.addEventListener('submit',function(event){
    
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
