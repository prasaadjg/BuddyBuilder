console.log('Hello World');

const signInUpButton=document.querySelector('#signInUpButton');



signInUpButton.addEventListener('click',()=>{
    console.log('Button Clicked');
    document.querySelector('#overlay').style.display='block';
});