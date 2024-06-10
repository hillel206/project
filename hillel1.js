document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById('game');
    const buttonPlay = document.getElementById('buttonPlay');
    let gameInterval; // משתנה שישמש לאחסון אינטרוול המשחק
    let timer; // משתנה שישמש למדידת זמן במשחק
    buttonPlay.addEventListener('click', startGame); // כשלוחצים על הכפתור  מתחיל המשחק

    function createGrid() {
        // יצירת 400 תאים
        for (let i = 0; i < 400; i++) {
            const cell = document.createElement('div'); //יצירת דיב עבור כל תא
            cell.id = 'e' + i; //   לכל יחידה id   
            cell.className = 'item'; // לכל תא class 
            game.appendChild(cell); // מוסיפה את האלמנט שנוצר אל  game
        }
    }

    let cells; // משתנה לאחסון כל התאים
    let snake; // משתנה לאחסון מיקום הנחש
    let direction; // משתנה לאחסון הכיוון של הנחש
    let score; // משתנה לאחסון הציון הנוכחי
    let foodIndex; // משתנה לאחסון מיקום האוכל

    function startGame() {
        game.innerHTML = ''; // איפוס תוכן האלמנט game
        createGrid(); // יצירת הגריד
        cells = document.querySelectorAll('.item'); // בחירת כל התאים שנוצרו
        snake = [42, 41, 40]; // מיקום התחלתי של הנחש
        direction = 1; // הכיוון הראשוני לימין
        score = 0; // איפוס הציון
        foodIndex = 0; // איפוס מיקום האוכל
        drawSnake(); // ציור הנחש על הגריד
        document.getElementById('score').innerHTML = score; // מעדכן את הציון המוצג על המסך
        placeFood(); // מיקום האוכל על הגריד
        let time = 0; // משתנה לאחסון הזמן שחלף

        // איפוס הטיימרים הקודמים אם קיימים
        if (timer) clearInterval(timer); // איפוס טיימר זמן המשחק
        if (gameInterval) clearInterval(gameInterval); // איפוס טיימר תנועת הנחש

        timer = setInterval(() => { // הגדרת טיימר זמן
            time += 1; // הגדלת הזמן שחלף
            document.getElementById('time').innerHTML = time; // הצגת הזמן שחלף
        }, 1000); // כל שנייה

        gameInterval = setInterval(moveSnake, 150); // הגדרת טיימר מהירות 
    }

    function drawSnake() {
        snake.forEach(index => cells[index].classList.add('snake')); //  ציור הנחש על המשבצות הרלוונטיות
    }
    
  function moveSnake() {
    const head = snake[0]; // האיבר הראשון במערך snake מייצג את הראש של הנחש
    const tail = snake.pop(); //  מייצג את הזנב של הנחש,האיבר האחרון במערך בשביל להסיר מסנייק
    cells[tail].classList.remove('snake'); // מוריד את סנייק מהתא שהיה  הזנב של הנחש  
    const newHead = head + direction; // מחשב את המיקום החדש של ראש הנחש בהתאם לכיוון הנוכחי שלו

        // בדיקת התנגשות בקירות או בנחש עצמו
        if (
            newHead < 0 || // אם הראש החדש מחוץ לגבולות הגריד
            newHead >= 400 || // אם הראש החדש מחוץ לגבולות הגריד
            (direction === 1 && newHead % 20 === 0) || // אם הראש החדש עובר את גבול ימין
            (direction === -1 && head % 20 === 0) || // אם הראש החדש עובר את גבול שמאל
            cells[newHead].classList.contains('snake') // אם הראש החדש מתנגש בנחש עצמו
        ) {
            alert(`Game over! Your score is ${score}`); // הצגת הודעת סוף המשחק עם הציון
            let username = localStorage.getItem("username"); // קבלת שם המשתמש מה-localStorage
            let user = localStorage.getItem(username); // קבלת נתוני המשתמש מה-localStorage
            user = JSON.parse(user); //JSON 
            let highScore = user.highScore; // קבלת הציון הגבוה ביותר של המשתמש
            console.log(user); // הדפסת נתוני המשתמש לקונסול

            if (!highScore || highScore < score) { // אם אין ציון גבוה או שהציון הנוכחי גבוה יותר
                user.highScore = score; // עדכון הציון הגבוה ביותר
                user = JSON.stringify(user); // המרת נתוני המשתמש חזרה ל-JSON
                localStorage.setItem(username, user); // שמירת נתוני המשתמש ב-localStorage
                localStorage.getItem(username); // קבלת נתוני המשתמש מה-localStorage (לא הכרחי כאן)
            }

            clearInterval(gameInterval); // עצירת טיימר המשחק
            clearInterval(timer); // עצירת טיימר הזמן
            document.getElementById('score').innerHTML = score; // עדכון הציון הנוכחי
            return; // יציאה מהפונקציה
        }

        snake.unshift(newHead); // 
        cells[newHead].classList.add('snake'); //

        if (newHead === foodIndex) { // אם הראש החדש נמצא במיקום של האוכל
            score++; // הגדלת הציון
            snake.push(tail); // הוספת הזנב חזרה לנחש
            cells[tail].classList.add('snake'); // הוספת class 'snake' לזנב שהתווסף
            placeFood(); // מיקום חדש לאוכל
            document.getElementById('score').innerHTML = score; // עדכון הציון הנוכחי
        }
    }

    function placeFood() {
        do {
            foodIndex = Math.floor(Math.random() * 400); // מיקום אקראי לאוכל
        } while (cells[foodIndex].classList.contains('snake')); // בדיקה שהמיקום החדש לא נמצא על הנחש
        cells.forEach(cell => cell.classList.remove('food')); // הסרת class 'food' מכל התאים
        cells[foodIndex].classList.add('food'); // הוספת class 'food' לתא החדש של האוכל
    }

    function control(e) {
        console.log(e); // הדפסת אירוע הלחיצה לקונסול
        if (e.keyCode === 39 && direction !== -1) { // אם נלחץ חץ ימין והכיוון הנוכחי לא שמאלה
            direction = 1; // כיוון לימין
        } else if (e.keyCode === 37 && direction !== 1) { // אם נלחץ חץ שמאלה והכיוון הנוכחי לא ימינה
            direction = -1; // כיוון לשמאלה
        } else if (e.keyCode === 38 && direction !== 20) { // אם נלחץ חץ למעלה והכיוון הנוכחי לא למטה
            direction = -20; // כיוון למעלה
        } else if (e.keyCode === 40 && direction !== -20) { // אם נלחץ חץ למטה והכיוון הנוכחי לא למעלה
            direction = 20; // כיוון למטה
        }
    }

    document.addEventListener('keydown', control); // לחיצות מקשים

    //  הכפתורים הוירטואליים
    document.getElementById('controlD').onclick = function () {
        control({ keyCode: 40 }); // לחיצה על חץ למטה
    };
    document.getElementById('controlR').onclick = function () {
        control({ keyCode: 39 }); // לחיצה על חץ ימינה
    };
    document.getElementById('controlL').onclick = function () {
        control({ keyCode: 37 }); // לחיצה על חץ שמאלה
    };
    document.getElementById('controlU').onclick = function () {
        control({ keyCode: 38 }); // לחיצה על חץ למעלה
    };

    createGrid(); // יצירת הגריד עם טעינת הדף
});
