export function editContact(firstName, lastName, phone, email, contactID) {
    console.log('Editing Contact with ID:', contactID);

    const contact = document.getElementById(contactID);
    if (!contact) {
        console.error("No contact element found with id:", contactID);
        return;
    }
    
    // Contact info
    const contactInfo = contact.querySelector('.contactInfo');
    if (!contactInfo) {
        console.error("No contactInfo section found in the contact:", contactID);
        return;
    }
    
    const contactName = contactInfo.querySelector('#contactName');
    if (contactName) {
        contactName.textContent = firstName + ' ' + lastName;
    } else {
        console.error("No contactName element found in the contact:", contactID);
    }
    
    const contactPhone = contactInfo.querySelector('#contactPhone');
    if (contactPhone) {
        contactPhone.textContent = phone;
    } else {
        console.error("No contactPhone element found in the contact:", contactID);
    }
    
    const contactEmail = contactInfo.querySelector('#contactEmail');
    if (contactEmail) {
        contactEmail.textContent = email;
    } else {
        console.error("No contactEmail element found in the contact:", contactID);
    }
}