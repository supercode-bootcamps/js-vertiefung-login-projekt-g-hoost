let submit = document.getElementById('submit');
let letter = document.getElementById('letter');
let modal = document.getElementById('modal');
let userPrompt = document.getElementById('userPrompt');
let form = document.querySelector('form');

console.log(submit);

function validateData()
{
    submit.addEventListener('click', (e) =>
    {
        let nameVal = document.getElementById('username').value.toLowerCase();
        let secretVal = document.getElementById('password').value;

        e.preventDefault();
        form.reset();

        fetch("https://supercode-auth-demo.herokuapp.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameVal,
                secret: secretVal,
            }),
        })
            .then(response => response.json())
            .then((data) =>
            {
                console.log(data);
                if (data.success) {
                    letter.style.color = 'transparent';
                    modal.style.visibility = 'hidden';
                    userPrompt.innerHTML = '> welcome, ' + nameVal;
                    setCookie('username', nameVal, 1);
                    setCookie('password', secretVal, 1);
                    setCookie('loggedIn', "true", 1);
                    document.getElementById('overlay').style.display = 'none';
                } else {
                    letter.innerHTML = '*' + data.message;
                    letter.style.color = 'red';
                    document.getElementById('asterisk').style.display = 'unset';
                }
            });
    });


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
                };
            };

            deleteAllCookies();
            window.location.reload();
        })
    };
    logOutButton();
};
validateData();