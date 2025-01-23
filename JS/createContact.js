export function createContact(firstName,lastName,phone,email)
{
    console.log('Creating Contact');

    const contactContainer=document.querySelector('#buddyList');
    const contact=document.createElement('div');
    contact.id='contact';


    const contactImageContainer=document.createElement('div');
    const contactImage=document.createElement('img');

    // placeholders
    // contactImage.src='https://via.placeholder.com/150';
    contactImage.alt='Contact Image';
    contactImage.id='contactImage';
    contactImageContainer.appendChild(contactImage);

    // button container for modifying contact
    const buttons=document.createElement('div');
    buttons.id='buttonContainer';
    
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
    contactInfo.id='contactInfo';
    const contactName=document.createElement('p');
    contactName.innerHTML=firstName+' '+lastName;
    contactInfo.appendChild(contactName);
    const contactPhone=document.createElement('p');
    contactPhone.innerHTML=phone;
    contactInfo.appendChild(contactPhone);
    const contactEmail=document.createElement('p');
    contactEmail.innerHTML=email;
    contactInfo.appendChild(contactEmail);

    contact.appendChild(contactImageContainer);
    contact.appendChild(contactInfo);
    contact.appendChild(buttons);
    contactContainer.appendChild(contact);
}
