const USERS = [
    { name: "supercode", secret: "no_one_will_know" },
    { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
    { name: "admin", secret: "1234" },
];

let submit = document.getElementById('submit');
let letter = document.getElementById('letter');
let modal = document.getElementById('modal');
let userPrompt = document.getElementById('userPrompt')
let form = document.querySelector('form');

submit.addEventListener('click', (e) =>
{
    let secret = document.getElementById('password').value;
    let name = document.getElementById('username').value;
    e.preventDefault();

    form.reset();
    USERS.find((x) =>
    {
        if (x.secret === secret) {
            letter.style.color = 'transparent';
        } else {
            letter.innerHTML = '* user does not exist';
            letter.style.color = 'red';
        }
        console.log(secret);
    });
});