import { createContact } from "./createContact.js";
import { displayGrid, displayList } from "./displaySwitch.js";
import { editContact } from "./editContact.js";
import { validateSignUp } from "./validateForm.js";
let userID=0;
let lazyObserver;

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
    slider.style.left='5.1vw';
});

// SIGN UP EVENT LISTENER
const signUp=document.querySelector('#signUp');
signUp.addEventListener('submit',function(event){
    event.preventDefault();

    if(!validateSignUp()){
        return;
    }
    console.log('Sign Up Form Submitted');
    
    const formData = {
        FirstName: signUp.querySelector('input[name="firstName"]').value,
        LastName: signUp.querySelector('input[name="lastName"]').value,
        Login: signUp.querySelector('input[name="username"]').value,
        Password: signUp.querySelector('input[name="password"]').value
    }
    console.log('FormData:', formData);
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
            const errorText=document.querySelector('#messageSignUp');
            errorText.classList.add('messageError');
            errorText.textContent=data.error;
        }

        else{
            console.log('User Registered');

            const messageSignUp = document.querySelector('#messageSignUp');
            messageSignUp.textContent = 'Sign up successful!';
            messageSignUp.classList.remove('messageError');
            messageSignUp.classList.add('messageSuccess');
            
            const user = formData.Login;
            const pass = formData.Password;

            // Clear form fields
            signUp.querySelector('input[name="firstName"]').value='';
            signUp.querySelector('input[name="lastName"]').value='';
            signUp.querySelector('input[name="username"]').value='';
            signUp.querySelector('input[name="password"]').value='';

            // Should I auto log in the user?
            fetch('LAMPAPI/Login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: user,
                    password: pass
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    console.log(data.error);
                } else {
                    
                    userID = data.id;
                    console.log('User Auto-Logged In ', userID);
                    document.querySelector('#overlay').style.display = 'none';
                    document.querySelector('.titlePage').style.display = 'none';
                    document.querySelector('.body').style.display = 'flex';
                    document.querySelector('#signInUpButton').style.display = 'none';
                    signOutButton.style.display='inline-block';
                }
            });
        }
    });
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
const inputIcon=document.querySelector('#eyeIcon1');
inputIcon.addEventListener('click',()=>{
    console.log('Icon Clicked');
    if(passwordInput.type==='password')
    {
        passwordInput.type='text';
        inputIcon.src='assets/eyeOpen.svg';
    }
    else
    {
        passwordInput.type='password';
        inputIcon.src='assets/eyeClosed.svg';
    }
});
passwordInput.addEventListener('blur', (event) => {
    if (event.relatedTarget !== usernameInput) {
        signUpReqPass.classList.remove('active');
    }
});
// SIGN IN EVENT LISTENER
const signIn=document.querySelector('#signIn');
const signOutButton=document.querySelector('#signOutButton');
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
            const errorText=document.querySelector('.messageLogIn');
            errorText.style.display='flex';

            setTimeout(()=>{
                errorText.style.display='none';
            },3000);
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
            signOutButton.style.display='inline-block';
        }
    })
});

const inputIcon2=document.querySelector('#eyeIcon2');
const passwordInput2=document.querySelector('#password2');
inputIcon2.addEventListener('click',()=>{
    console.log('Icon Clicked');
    if(passwordInput2.type==='password')
        {
            passwordInput2.type='text';
            inputIcon2.src='assets/eyeOpen.svg';
        }
        else
        {
            passwordInput2.type='password';
            inputIcon2.src='assets/eyeClosed.svg';
        }
});
signOutButton.addEventListener('click',()=>{
    console.log('Sign Out Button Clicked');
    userID=0;
    document.querySelector('.body').style.display='none';
    document.querySelector('.titlePage').style.display='flex';
    document.querySelector('#signInUpButton').style.display='inline-block';
    signOutButton.style.display='none';

    const display=document.querySelector('.contactContainer');

    while(display.children[0].children.length>0)
    {
        display.children[0].children[0].remove();
    }
});
// -------------------------ADD CONTACT----------------------------
const addContactButton= document.querySelector('#addContactButton');
const closeButton2=document.querySelector('#closeButton2');
const addContact = document.querySelector('#addContactForm');
let displayFlag = true;

addContactButton.addEventListener('click',()=>{
    console.log('Add Contact Button Clicked');
    document.querySelector('#overlay2').style.display='block';
    addContact.querySelector('input[name="firstName"]').value='';
    addContact.querySelector('input[name="lastName"]').value='';
    addContact.querySelector('input[name="phone"]').value='';
    addContact.querySelector('input[name="email"]').value='';

});

closeButton2.addEventListener('click',()=>{
    document.querySelector('#overlay2').style.display='none';
});





addContact.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        firstName: addContact.querySelector('input[name="firstName"]').value.trim(),
        lastName: addContact.querySelector('input[name="lastName"]').value.trim(),
        phone: addContact.querySelector('input[name="phone"]').value.trim(),
        email: addContact.querySelector('input[name="email"]').value.trim(),
        userID: userID
    };

    // Log formData to check structure
    console.log('FormData:', formData);

    fetch('LAMPAPI/AddContact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Success Adding:", data);
        let contactID = data.id;
        console.log('Contact ID:', contactID);
        createContact(formData.firstName, formData.lastName, formData.phone, formData.email, contactID);
        
        if(displayFlag) {
            displayGrid();
        } else {
            displayList();
        }
        document.querySelector('#overlay2').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error appropriately
    });
});


// -------------------------DELETE CONTACT-------------------------

// Replace existing delete contact code with:

let containerType='#buddyGrid';
let displayType='.contactGrid';
document.querySelector(containerType).addEventListener('click', function(event) {
    if (event.target.id === 'deleteButton') {
        const button = event.target;
        const contactCard = button.closest(displayType);
        console.log(contactCard);
        console.log(contactCard.id);
        const data={
            ID:parseInt(contactCard.id)
        }
        
        if (contactCard) {
            // Check if button is already in confirmation state
            if (button.dataset.confirming === 'true') {
                // Second click - delete the contact
                try {
                    fetch('LAMPAPI/deleteContact.php', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
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
const overlay3 = document.querySelector('#overlay3');
const editContactForm = document.querySelector('#editContactForm');

document.querySelector(containerType).addEventListener('click', function(event) {
    if (event.target.id === 'editButton') {
        const button = event.target;
        const contactCard = button.closest(displayType);

        if (contactCard) {
            const contactID = contactCard.id; // Assuming contact ID is stored in data-contact-id attribute
            console.log('Editing Contact with ID:', contactID);
            const name = contactCard.querySelector('#contactName').textContent.split(' ');
            const firstName = name[0];
            const lastName = name[1];
            const phone = contactCard.querySelector('#contactPhone').textContent;
            const email = contactCard.querySelector('#contactEmail').textContent;

            editContactForm.querySelector('input[name="firstName"]').value = firstName;
            editContactForm.querySelector('input[name="lastName"]').value = lastName;
            editContactForm.querySelector('input[name="phone"]').value = phone;
            editContactForm.querySelector('input[name="email"]').value = email;
            editContactForm.dataset.contactId = contactID; // Store contact ID in form's dataset

            overlay3.style.display = 'block';

            editContactForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const formData = {
                    firstName: editContactForm.querySelector('input[name="firstName"]').value,
                    lastName: editContactForm.querySelector('input[name="lastName"]').value,
                    phone: editContactForm.querySelector('input[name="phone"]').value,
                    email: editContactForm.querySelector('input[name="email"]').value,
                    id: parseInt(contactID) // Get contact ID from form's dataset
                };

                fetch('LAMPAPI/EditContact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success Editing:', data);
                    // Update contact details in the UI if needed
                    editContact(formData.firstName, formData.lastName, formData.phone, formData.email, contactID);
                    overlay3.style.display = 'none';
                });
            }, { once: true }); // Ensure the event listener is added only once
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
    displayType='.contactGrid';
});

listButton.addEventListener('click',()=>{
    displayList();
    displayFlag=false;
    containerType='#buddyList';
    displayType='.contactList';
});

// -------------------------SEARCH CONTACT-------------------------

const searchInput=document.querySelector('#searchBarInp');
const searchButton=document.querySelector('#searchContactButton');

searchButton.addEventListener('click',()=>{
    const searchValue=searchInput.value;
    console.log('Searching for:',searchValue);
    fetch('LAMPAPI/SearchContacts.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            search:searchValue,
            userId:userID
        })
    })
    .then(response=>response.json())
    .then(data=>{
        console.log('Search Results:',data);
        if(data.error){
            console.log(data.error);
        }
        else{
            console.log('Search Successful');
            document.querySelector(containerType).innerHTML='';
            data.results.forEach(contact=>{
                console.log(contact);
                createContact(contact.FirstName,contact.LastName,contact.Phone,contact.Email,contact.ID);
            });
            if(displayFlag)
            {
                displayGrid();
            }
            else
            {
                displayList();
            }
            searchInput.value='';
        }
    });
});


//------------------------Easteregg-------------------------
const logo=document.querySelector('#logo');
const rocket=document.querySelector('#rocket');
let clickCount=0;
logo.addEventListener('click',()=>{
    console.log('Logo Clicked');
    clickCount++;

    if(clickCount>0 && clickCount%10==0)
    {
        console.log("Easter Egg Activated");
        rocket.style.display='block';
        rocket.classList.add('flying');

        setTimeout(()=>{
            rocket.classList.remove('flying');
            rocket.style.display='none';
        },5000);

    }
});