export function createContact(firstName,lastName,phone,email,contactID)
{
    console.log('Creating Contact');

    const contactContainer=document.querySelector('.contactContainer');
    const contact=document.createElement('div');
    contact.id=contactID;

    
    // button container for modifying contact
    const buttons=document.createElement('div');
    
    const editButton=document.createElement('button');
    editButton.innerHTML='Edit';
    editButton.id='editButton';
    buttons.appendChild(editButton);
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='Delete';
    deleteButton.id='deleteButton';
    buttons.appendChild(deleteButton);
    

    // contact info
    const contactInfo=document.createElement('div');
    contactInfo.classList.add('contactInfo');
    const contactName=document.createElement('p');
    contactName.id='contactName';
    contactName.textContent=firstName+' '+lastName;
    contactInfo.appendChild(contactName);
    const contactPhone=document.createElement('p');
    contactPhone.id='contactPhone';
    contactPhone.textContent=phone;
    contactInfo.appendChild(contactPhone);
    const contactEmail=document.createElement('p');
    contactEmail.id='contactEmail';
    contactEmail.textContent=email;
    contactInfo.appendChild(contactEmail);

    contact.appendChild(contactInfo);
    contact.appendChild(buttons);
    contactContainer.children[0].appendChild(contact);
}


