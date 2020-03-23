const form = document.getElementById('form');
const username = document.getElementById('логин');
const email = document.getElementById('email');
const password = document.getElementById('пароль');
const password2 = document.getElementById('пароль2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.trim() !== '') {
        if (input.value.length < min) {
            showError(
                input,
                `${getFieldName(input)} должен быть не менее ${min} символов`
            );
        } else if (input.value.length > max) {
            showError(
                input,
                `${getFieldName(input)} должен быть более ${max} символов`
            );
        } else {
            showSuccess(input);
        }
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value.trim() !== '' || input2.value.trim() !== '') {
        if (input1.value !== input2.value) {
            showError(input2, 'Пароли не совпадают');
        }
    }
}

//Show input success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.value.trim() !== '') {
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email неправильный');
        }
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} необходимо заполнить`);
        } else {
            showSuccess(input);
        }
    });
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
