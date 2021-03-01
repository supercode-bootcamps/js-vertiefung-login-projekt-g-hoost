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
let navBar = document.querySelector('nav');
let leftClass = document.getElementsByClassName('left');

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
                setCookie('username', nameVal, x);
                setCookie('loggedIn', "true", x);
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
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
function secretContent()
{
    let fireworks = document.querySelector('img');
    fireworks.addEventListener('click', e =>
    {
        hacked.style.visibility = 'inherit';
    })
};

function logOutButton()
{
    let logOut = document.getElementById('logOut');

    logOut.addEventListener("click", e =>
    {
        function deleteAllCookies()
        {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            };
        };

        deleteAllCookies();
        location.reload();
    })
};
logOutButton();