window.onload = function () {
    init();
    
};
var languagesChecked;
var messages = ["wybierz tylko 3 języki\n", "nieprawidłowe imię \n", "nieprawidłowe nazwisko \n", "nieprawidłowe miasto \n", "nieprawidłowy kod pocztowy \n", "nieprawidłowe województwo \n", "nieprawidłowy mail \n", "nieprawidłowe ip \n", "nieprawidłowy url \n", "nieprawidłowe haslo \n"];
var indexAnswer = {};
indexAnswer["languagesBar"] = 0;
indexAnswer["nameBar"] = 1;
indexAnswer["surnameBar"] = 2;
indexAnswer["cityBar"] = 3;
indexAnswer["postalBar"] = 4;
indexAnswer["areaBar"] = 5;
indexAnswer["mailBar"] = 6;
indexAnswer["ipBar"] = 7;
indexAnswer["urlBar"] = 8;
indexAnswer["passwordBar"] = 9;
var correctAnswers=[false,false,false,false,false,false,false,false,false,false]
var page1Div;
var page2Div;
var page3Div;
var next1Button;
var next2button;
var next3Button;
var back1Button;
var back2Button;
var back3Button;
var nameInput;
var surnameInput;
var cityInput;
var postalInput;
var areaInput;
var mailInput;
var ipInput;
var urlInput;
var passwordInput;
var passwordMeter;
var okButton;

function goTo(goToDiv, goFromDiv) {
    goToDiv.classList.remove("hidden");
    goFromDiv.classList.add("hidden");
}
function validateLength(input, dotId) {
    var dot = document.getElementById(dotId);
    if (input.value.length == 0) {
        dot.style.backgroundColor = "white";
    }
    else if (input.checkValidity()) {
        dot.style.backgroundColor = "green";
        return true;
    }
    else {
        dot.style.backgroundColor = "red";
    }
    return false;
}
function init() {
    initVariables();
    initMoveButtons();
    initForm1();
    initForm2();
    initForm3();

}
function initVariables() {
    languagesChecked = [];
    page1Div = document.getElementById("page1");
    page2Div = document.getElementById("page2");
    page3Div = document.getElementById("page3");
    next1Button = document.getElementById("next1");
    back1Button = document.getElementById("back1");
    next2Button = document.getElementById("next2");
    back2Button = document.getElementById("back2");
    next3Button = document.getElementById("next3");
    back3Button = document.getElementById("back3");
    nameInput = document.getElementById("name");
    surnameInput = document.getElementById("surname");
    cityInput = document.getElementById("city");
    postalInput = document.getElementById("postal");
    areaInput = document.getElementById("area");
    mailInput = document.getElementById("mail");
    ipInput = document.getElementById("ip");
    urlInput = document.getElementById("url");
    passwordInput = document.getElementById("password");
    passwordMeter = document.getElementById("passwordMeter");
    okButton = document.getElementById("ok");
}
function initMoveButtons() {
    next1Button.onclick = function () { goTo(page2Div, page1Div) };
    next2Button.onclick = function () { goTo(page3Div, page2Div) };
    next3Button.onclick = function () { goTo(page1Div, page3Div) };
    back1Button.onclick = function () { goTo(page3Div, page1Div) };
    back2Button.onclick = function () { goTo(page1Div, page2Div) };
    back3Button.onclick = function () { goTo(page2Div, page3Div) };
}
function initForm1() {
    document.getElementById("form1").onchange = validateLanguages;
}

function initForm2() {
    nameInput.onblur = nameInput.onkeyup = nameInput.onfocus = validateName;
    surnameInput.onblur = surnameInput.onkeyup = cityInput.onfocus = validateSurname;
    cityInput.onblur = cityInput.onkeyup = cityInput.onfocus = validateCity;
    postalInput.onblur = postalInput.onkeyup = postalInput.onfocus = validatePostal;
    areaInput.onblur = areaInput.onchange = areaInput.onfocus = validateArea;
}
function initForm3() {
    mailInput.onblur = mailInput.onkeyup = mailInput.onfocus = validateEmail;
    ipInput.onblur = ipInput.onkeyup = ipInput.onfocus = validateIp;
    urlInput.onblur = urlInput.onkeyup = urlInput.onfocus = validateUrl;
    passwordInput.onblur = passwordInput.onkeyup = passwordInput.onfocus = validatePassword;
    okButton.onclick = okButtonAction;
}

function validateLanguages() {
    for (i = 0; i < 5; i++) {
        var checkbox = document.getElementById("lang" + i.toString(10));
        var dot = document.getElementById("dot" + i.toString(10));
        if (checkbox.checked) {
            activateLanguage(checkbox, dot);
        }
        else {
            deactivateLanguage(checkbox, dot);
        }

        updateBar("languagesBar", languagesChecked.length == 3);
    }

}
function activateLanguage(checkbox, dot) {
    if (languagesChecked.indexOf(checkbox) == -1) {
        languagesChecked[languagesChecked.length] = checkbox;

        if (languagesChecked.length > 3) dot.style.backgroundColor = "red";
        else dot.style.backgroundColor = "green";
    }
}
function deactivateLanguage(checkbox, dot) {
    var index = languagesChecked.indexOf(checkbox);
    if (index != -1) {
        var removedCheckbox = languagesChecked.splice(index, 1);
        dot.style.backgroundColor = "white";
        if (languagesChecked.length > 2) {
            var dotToChange = document.getElementById("dot" + languagesChecked[2].name[languagesChecked[2].name.length - 1]);
            dotToChange.style.backgroundColor = "green";
        }
    }
}
function updateBar(barId, valueToTest) {
    if (valueToTest) {
        document.getElementById(barId).classList.add("green");
        correctAnswers[indexAnswer[barId]]=true;
    }
    else {
        correctAnswers[indexAnswer[barId]]=false;
        if (document.getElementById(barId).classList.contains("green")) {
            document.getElementById(barId).classList.remove("green");
        }
    }
}
function validateName() {
    var x = validateLength(nameInput, "nameDot");
    updateBar("nameBar", x);
    return x;
}
function validateSurname() {
    var x = validateLength(surnameInput, "surnameDot");
    updateBar("surnameBar", x);
    return x;
}
function validateCity() {
    var x = validateLength(cityInput, "cityDot");
    updateBar("cityBar", x);
    return x;
}
function validatePostal() {
    if (this.value.length == 2 && this.value.indexOf('-') == -1) this.value += '-';
    var x = validateLength(postalInput, "postalDot");
    updateBar("postalBar", x);
    return x;
}
function validateArea() {
    var dot = document.getElementById("areaDot");
    if (area.value != "none") {
        dot.style.backgroundColor = "green";
        updateBar("areaBar", true);
    }
}
function validateEmail() {
    var x = validateLength(mailInput, "mailDot");
    updateBar("mailBar", x);
    return x;
}

function validateIp() {
    validateLength(ipInput, "IPDot");
    var ipArray = document.getElementById("ip").value.split(".");
    var ret = true;
    for (x in ipArray) {
        if (isNaN(x)) {
            var value = parseInt(x);
            if (value < 0 || value > 255 || value == NaN) ret = false;
        }
        else {
            x = false;
        }

    }
    updateBar("ipBar", ret);
    return ret;

}
function validateUrl() {
    var x = validateLength(urlInput, "URLDot");
    updateBar("urlBar", x);
    return x;
}
function validatePassword() {
    var password = document.getElementById("password").value;
    var strengthCounter = 0;
    var criteriaArray = [/[!@#$%^&*(),.?":{}|<>]/, /[A-Z]/, /[a-z]/, /[0-9]/];
    var x;
    for (i = 0; i < criteriaArray.length; i++) {
        if (password.match(criteriaArray[i])) strengthCounter++;
    }
    if (strengthCounter > 2 && password.length > 7) {
        document.getElementById("passwordDot").style.backgroundColor = "green";
        passwordMeter.value = 1;
        if (password.length < 13 && password.length > 10) passwordMeter.value = 2;
        else if (password.length < 17 && password.length >= 13) passwordMeter.value = 3;
        else if (password.length >= 17) passwordMeter.value = 4;
        x = true;
    }
    else {
        document.getElementById("passwordDot").style.backgroundColor = "red";
        passwordMeter.value = 0;
        x = false;
    }
    updateBar("passwordBar", x);
    return x;
}
function okButtonAction() {
    var message = "";
    for(i=0;i<correctAnswers.length;i++){
        if(!correctAnswers[i]) message+=messages[i];
    }
    if (message != "") alert(message);
}