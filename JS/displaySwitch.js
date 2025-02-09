export function displayList()
{
    const contactContainer=document.querySelector('.contactContainer');
    const list= contactContainer.children[0];
    list.id='buddyList';
    for(let i=0;i<list.children.length;i++)
    {
        list.children[i].classList.add('contactList');
        list.children[i].classList.remove('contactGrid');
        list.children[i].children[0].classList.add('contactInfo2');
        list.children[i].children[0].classList.remove('contactInfo');
        list.children[i].children[1].classList.add('buttonContainer2');
        list.children[i].children[1].classList.remove('buttonContainer');
    }

    const displaySlider=document.querySelector('#displaySlider');
    displaySlider.style.left='5.1vw';

}

export function displayGrid()
{
    const contactContainer=document.querySelector('.contactContainer');
    const list= contactContainer.children[0];
    list.id='buddyGrid';
    for(let i=0;i<list.children.length;i++)
    {
        list.children[i].classList.add('contactGrid');
        list.children[i].classList.remove('contactList');
        list.children[i].children[0].classList.add('contactInfo');
        list.children[i].children[0].classList.remove('contactInfo2');
        list.children[i].children[1].classList.add('buttonContainer');
        list.children[i].children[1].classList.remove('buttonContainer2');
    }

    const displaySlider=document.querySelector('#displaySlider');
    displaySlider.style.left='0px';
}
