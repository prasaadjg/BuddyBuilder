export function displayList()
{
    const contactContainer=document.querySelector('.contactContainer');
    const list= contactContainer.children[0];
    list.id='buddyList';
    for(let i=0;i<list.children.length;i++)
    {
        list.children[i].id='contactList';
        list.children[i].children[0].id='contactInfo2';
        list.children[i].children[1].id='buttonContainer2';
    }

    const displaySlider=document.querySelector('#displaySlider');
    displaySlider.style.left='130px';

}

export function displayGrid()
{
    const contactContainer=document.querySelector('.contactContainer');
    const list= contactContainer.children[0];
    list.id='buddyGrid';
    for(let i=0;i<list.children.length;i++)
    {
        list.children[i].id='contactGrid';
        list.children[i].children[0].id='contactInfo';
        list.children[i].children[1].id='buttonContainer';
    }

    const displaySlider=document.querySelector('#displaySlider');
    displaySlider.style.left='0px';
}