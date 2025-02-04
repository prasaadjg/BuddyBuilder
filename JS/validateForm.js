export function validateSignUp()
{
    let isValid = true;
    const firstName = signUp.querySelector('input[name="firstName"]');
    const lastName = signUp.querySelector('input[name="lastName"]');
    const username = signUp.querySelector('input[name="username"]');
    const password = signUp.querySelector('input[name="password"]');

    // Validate firstName (letters only)
    if (!/^[A-Za-z]{2,30}$/.test(firstName.value)) {
        isValid = false;
    }

    // Validate lastName (letters only)
    if (!/^[A-Za-z]{2,30}$/.test(lastName.value)) {
        isValid = false;
    }

    // Validate username (3-20 chars, alphanumeric)
    if (!/^[a-zA-Z0-9]{3,20}$/.test(username.value)) {
        isValid = false;
    }

    // Validate password (8+ chars, special char, number)
    if (!/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,}$/.test(password.value)) {
        isValid = false;
    }

    const messageSignUp = document.querySelector('#messageSignUp');
    if(isValid)
    {
        messageSignUp.textContent = 'Sign up successful!';
        messageSignUp.classList.add('messageSuccess');
        
        [firstName, lastName, username, password].forEach(input => {
            input.style.border = '1px solid #adb5bd'; // Default border style
        });
    }

    if(!isValid)
    {
        messageSignUp.textContent = 'Invalid input';
        messageSignUp.classList.add('messageError');

    }
    return isValid;
}