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

function validateData()
{
    submit.addEventListener('click', (e) =>
    {
        let secretVal = document.getElementById('password').value;


        e.preventDefault();

        form.reset();
        USERS.find((x) =>
        {
            if (x.secret === secretVal) {
                console.log('richtige Eingabe');
                letter.style.color = 'transparent';
                modal.style.visibility = 'hidden';

            } else {
                letter.innerHTML = '* user does not exist';
                letter.style.color = 'red';
            }
        });
    });
};
validateData();