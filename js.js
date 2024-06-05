function showForm(formId) {//מראה ומסתיר חלק מטופס הרישום או התחברות
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById(formId).classList.add('active');
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const highScore = 0;

    if (username && password) {
        const user = {
            password: password,
            highScore: highScore
        };
        localStorage.setItem(username, JSON.stringify(user));
        alert("רישום בוצע בהצלחה!");
    } else {
        alert("נא למלא את כל השדות.");
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
            alert("כניסה בוצעה בהצלחה! הציון הגבוה שלך הוא: " + user.highScore);
            window.location.href = 'hillel1.html'; // העברה לדף המשחק
        } else {
            alert("שם משתמש או סיסמא שגויים.");
        }
    } else {
        alert("נא למלא את כל השדות.");
    }
}