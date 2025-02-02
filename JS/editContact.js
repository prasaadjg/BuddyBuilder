export function editContact(firstName,lastName,phone,email,contactID)
{
    console.log('Editing Contact');

    const contact=document.getElementById(contactID);
    // contact info
    const contactInfo=contact.querySelector('.contactInfo');
    const contactName=contactInfo.querySelector('#contactName');
    contactName.textContent=firstName+' '+lastName;
    const contactPhone=contactInfo.querySelector('#contactPhone');
    contactPhone.textContent=phone;
    const contactEmail=contactInfo.querySelector('#contactEmail');
    contactEmail.textContent=email;
}