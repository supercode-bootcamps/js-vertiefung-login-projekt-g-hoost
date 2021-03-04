const USERS = [
    { name: "supercode", secret: "no_one_will_know" },
    { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
    { name: "admin", secret: "1234" },
];

let submit = document.getElementById('submit');
let letter = document.getElementById('letter');
let modal = document.getElementById('modal');
let userPrompt = document.getElementById('userPrompt');
let form = document.querySelector('form');

function validateData()
{
    submit.addEventListener('click', (e) =>
    {
        let nameVal = document.getElementById('username').value.toLowerCase();
        let secretVal = document.getElementById('password').value;

        e.preventDefault();

        form.reset();
        USERS.find((x) =>
        {
            if (x.secret === secretVal && x.name === nameVal) {
                console.log('richtige Eingabe');
                letter.style.color = 'transparent';
                modal.style.visibility = 'hidden';
                userPrompt.innerHTML = '> welcome, ' + x.name;
                setCookie('username', nameVal, 1);
                setCookie('password', secretVal, 1);
                setCookie('loggedIn', "true", 1);
                document.getElementById('overlay').style.display = 'none';

            } else {
                letter.innerHTML = '* user does not exist';
                letter.style.color = 'red';
            }
        });
    });
};
validateData();

function setCookie(cname, cvalue, exdays)
{
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
if (document.cookie) { console.log('true') };

function loggedIn()
{
    let loggedIn = getCookie('loggedIn');
    if (loggedIn === "true") {
        let userID = getCookie('username');
        let passWord = getCookie('password');
        nameVal = userID;
        secretVal = passWord;
        letter.style.color = 'transparent';
        modal.style.visibility = 'hidden';
        document.getElementById('overlay').style.display = 'none';
        userPrompt.innerHTML = '> welcome back, ' + nameVal;
    }
};
loggedIn();

function secretContent()
{
    let secretContent = document.getElementById('secretContent');
    secretContent.addEventListener('click', e =>
    {
        document.getElementById('hacked').style.visibility = 'visible';
    })
};
secretContent();


function logOutButton()
{
    let logOut = document.getElementById('logOut');

    logOut.addEventListener("click", e =>
    {
        function deleteAllCookies()
        {
            let cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                location.reload();
            };
        };

        deleteAllCookies();
        location.reload();
    })
};
logOutButton();